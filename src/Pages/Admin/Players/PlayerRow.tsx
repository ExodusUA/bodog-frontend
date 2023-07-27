import React from 'react'
import { Table } from 'flowbite-react'
import User from '../../../interfaces/user'
import { useNavigate } from 'react-router-dom'

interface PropsTypes {
    user: User,
    key: number
}


function PlayerRow({ user, key }: PropsTypes) {

    const navigate = useNavigate()

    return (
        <Table.Row className={`dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-50`} onClick={() => navigate(`/admin/player/${user.Id}`)}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    {user.Username}
                </p>
            </Table.Cell>
            <Table.Cell>
                {user.Fullname}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>{user.Email}</p>
            </Table.Cell>
            <Table.Cell>
                {
                    user.LastPick === null
                        ? 'No pick yet'
                        : <div className='flex gap-4 items-center'>
                            <p>{user.LastPick?.FullName}</p>
                            <img src={user.LastPick?.WikipediaLogoURL} alt="Team logo" className='w-8 h-8' />
                        </div>
                }
            </Table.Cell>
            <Table.Cell>
                {
                    user.IsAlive === true
                        ? <span className="inline-flex items-center rounded-md px-2 pb-1 text-xs font-medium text-white ring-inset uppercase font-title bg-[#D7AA50]">Active</span>
                        : <span className="inline-flex items-center rounded-md bg-[#E80000] text-white px-2 pb-1 text-xs font-medium text-red-700 uppercase font-title">deceased</span>
                }
            </Table.Cell>
            <Table.Cell>
                {
                    user.Streak
                }
            </Table.Cell>
        </Table.Row>
    )
}

export default PlayerRow