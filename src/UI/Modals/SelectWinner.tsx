import { XCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import User from '../../interfaces/user'
import settingsAPI from '../../requests/settings'


interface PropsTypes {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
    data: any
}

function SelectWinner({ setIsModalOpen, data, setAlertOpen }: PropsTypes) {

    const [searchValue, setSearchValue] = useState<string>('')
    const [teams, setTeams] = useState<any>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [showUsersList, setShowUsersList] = useState<boolean>(false)

    useEffect(() => {
        setTeams(data)
        console.log(data)
    }, [])

    function selectTeam() {
        setIsModalOpen(false)

        let teamID = data.AwayTeamName === searchValue ? data.AwayTeamId : data.HomeTeamId
        let matchID = data.MatchID
        const winner = settingsAPI.selectWinnerTeam(teamID, matchID)

        winner.then((res: any) => {
            setAlertOpen(true)

        })
    }

    return (
        <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500/50 w-full h-full flex flex-col justify-center items-center '>
            <div className='flex flex-col justify-center items-center bg-white p-8 rounded-[12px] min-w-[90%] md:min-w-fit' >
                <div className='flex items-center justify-between w-full'>
                    <p className='font-bold'>Select winner team</p>
                    <XCircleIcon className='w-6 h-6 text-gray cursor-pointer duration-300 hover:text-red' onClick={e => setIsModalOpen(false)} />

                </div>
                <div className='min-w-[100%] md:min-w-[400px] py-6 relative'>
                    <input onBlur={e => {
                        setTimeout(() => {
                            setShowUsersList(false)
                        }, 100)
                    }} onFocus={e => setShowUsersList(true)} className='w-full focus:ring-red focus:border-red text-[14px]' type="text" placeholder='Select team' value={searchValue} onChange={e => setSearchValue(e.target.value)} />

                    {
                        showUsersList &&
                        <div className='absolute bg-white w-full max-h-[200px] overflow-y-scroll shadow-lg top-[68px]'>

                            <div className='w-full py-2 pl-4 border-l-2 border-transparent duration-300 hover:border-red cursor-pointer flex items-center gap-2' onClick={e => setSearchValue(teams.AwayTeamName)}>
                                <img className='w-5 h-5' src={teams.AwayTeamLogo} alt="Logo" />
                                <p className='font-bold text-[14px]'>{teams.AwayTeamCity + ' ' + teams.AwayTeamName}</p>
                            </div>

                            <div className='w-full py-2 pl-4 border-l-2 border-transparent duration-300 hover:border-red cursor-pointer flex items-center gap-2' onClick={e => setSearchValue(teams.HomeTeamName)}>
                                <img className='w-5 h-5' src={teams.HomeTeamLogo} alt="Logo" />
                                <p className='font-bold text-[14px]'>{teams.HomeTeamCity + ' ' + teams.HomeTeamName}</p>
                            </div>

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
                    <button className='bg-red py-2 px-4 rounded-[8px] duration-300 text-white hover:opacity-70 font-bold' onClick={e => selectTeam()}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default SelectWinner