import React from 'react'
import { Table } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import Week from '../../../interfaces/gameweek'
import moment from 'moment'

interface PropsTypes {
    week: Week,
    key: number
}


function WeekRow({ week, key }: PropsTypes) {

    const navigate = useNavigate()

    return (
        <Table.Row className={`dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-50`} onClick={() => navigate(`/admin/week/${week.id}`)}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    Week {week.id}
                </p>
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    {moment(week.time).format('DD/MM/YYYY HH:mm')} GMT
                </p>
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    {week.players}
                </p>
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    {week.playersProgressed}
                </p>
            </Table.Cell>

        </Table.Row>
    )
}

export default WeekRow