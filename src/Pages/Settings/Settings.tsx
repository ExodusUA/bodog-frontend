import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Table } from 'flowbite-react'
import React, { useEffect } from 'react'
import User from '../../interfaces/user'
import userAPI from '../../requests/user'
import AdminRow from './AdminRow'
import AddAdmin from '../../UI/Modals/AddAdmin'
import Alert from '../../UI/Alert/Alert'


interface PropsTypes {
    setSelectedPage: React.Dispatch<React.SetStateAction<string>>
}

function Settings({ setSelectedPage }: PropsTypes) {

    setSelectedPage('Settings')

    const [admins, setAdmins] = React.useState<User[]>([])
    const [isAdminModalOpen, setIsAdminModalOpen] = React.useState<boolean>(false)
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)

    useEffect(() => {

        const admins = userAPI.getAdminList()

        admins.then((response) => {
            setAdmins(response)
        })

    }, [])

    return (
        <div className='w-full h-full rounded-[12px] p-6'>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-2xl md:text-4xl color-dark font-title'>Settings</p>

                <div className='flex items-center gap-10'>
                    <div className='items-center flex relative'>
                        <button className='flex items-center bg-red rounded-lg p-2 gap-2 duration-300 hover:opacity-50' onClick={e => setIsAdminModalOpen(true)}>
                            <PlusCircleIcon className='w-6 h-6 text-white' />
                            <p className='text-white text-[14px] font-bold'>Add Admin</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className='bg-white p-6 mt-16 rounded-[8px] h-[90%] pb-4'>
                <p className='font-bold text-[20px] text=[#111928]'>Total Admins: {admins.length}</p>

                <div className='overflow-auto h-[100%]'>
                    <Table striped className='mt-10' >
                        <Table.Head className='bg-[#F9FAFB]'>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Username
                            </Table.HeadCell>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Email
                            </Table.HeadCell>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Registration Date
                            </Table.HeadCell>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Actions
                            </Table.HeadCell>
                        </Table.Head>

                        <Table.Body className="divide-y">
                            {
                                admins.map((admin, index) => (
                                    <AdminRow user={admin} key={index} admins={admins} setAdmins={setAdmins} />
                                ))
                            }
                        </Table.Body>

                    </Table>
                </div>
            </div>
            {
                isAdminModalOpen && <AddAdmin setIsModalOpen={setIsAdminModalOpen} setAlertOpen={setAlertOpen} admins={admins} setAdmins={setAdmins}></AddAdmin>
            }

            {
                alertOpen && <Alert type={'done'} text='Admin added successfully!' closeHandler={setAlertOpen} />
            }
        </div>
    )
}

export default Settings