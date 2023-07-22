import { XCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import User from '../../interfaces/user'
import userAPI from '../../requests/user'

interface PropsTypes {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
    setAdmins: React.Dispatch<React.SetStateAction<User[]>>
    admins: User[]
}

function ModalWindow({ setIsModalOpen, setAlertOpen, admins, setAdmins }: PropsTypes) {

    const [searchValue, setSearchValue] = useState<string>('')
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [showUsersList, setShowUsersList] = useState<boolean>(false)

    useEffect(() => {

        let users = userAPI.searchUsers(searchValue)

        users.then((response) => {

            const data = response.filter((user) => user.AdminStatus === 0)
            setUsers(data)

        }).catch((error) => {
            console.log(error)
        })

    }, [searchValue])

    function addAdmin() {
        setIsModalOpen(false)

        let user = selectedUser as User

        const response = userAPI.addAdmin(user.Id, 1)

        response.then((response) => {

            if (response.message === 'Admin status updated') {
                setAdmins([...admins, user])
                setAlertOpen(true)
                setIsModalOpen(false)
            } else {
                alert(response.message)
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500/50 w-full h-full flex flex-col justify-center items-center '>
            <div className='flex flex-col justify-center items-center bg-white p-8 rounded-[12px] min-w-[90%] md:min-w-fit' >
                <div className='flex items-center justify-between w-full'>
                    <p className='font-bold'>Add new administrator</p>
                    <XCircleIcon className='w-6 h-6 text-gray cursor-pointer duration-300 hover:text-red' onClick={e => setIsModalOpen(false)} />

                </div>
                <div className='min-w-[100%] md:min-w-[400px] py-6 relative'>
                    <input onBlur={e => {
                        setTimeout(() => {
                            setShowUsersList(false)
                        }, 100)
                    }} onFocus={e => setShowUsersList(true)} className='w-full focus:ring-red focus:border-red text-[14px]' type="text" placeholder='Enter username or email' value={searchValue} onChange={e => setSearchValue(e.target.value)} />

                    {
                        showUsersList &&
                        <div className='absolute bg-white w-full max-h-[200px] overflow-y-scroll shadow-lg top-[68px]'>

                            {
                                users.map((user) => (
                                    <div className='w-full py-2 pl-4 border-l-2 border-transparent duration-300 hover:border-red cursor-pointer' onClick={e => {
                                        setSelectedUser(user)

                                    }}>
                                        <p className='font-bold text-[14px]'>{user.Username}</p>
                                        <p className='text-[12px] text-gray-500'>{user.Email}</p>
                                    </div>
                                ))
                            }

                        </div>
                    }

                </div>

                <div className='w-full'>
                    {
                        selectedUser !== null &&
                        <div className='w-full py-2 pl-4 border-l-2 duration-300 border-red cursor-pointer'>
                            <p className='font-bold text-[14px]'>{selectedUser.Username}</p>
                            <p className='text-[12px] text-gray-500'>{selectedUser.Email}</p>
                        </div>
                    }
                </div>

                <div className='flex justify-end w-full'>
                    <button className='bg-red py-2 px-4 rounded-[8px] duration-300 text-white hover:opacity-70 font-bold' onClick={e => addAdmin()}>Save</button>
                </div>
            </div>

        </div>
    )
}

export default ModalWindow