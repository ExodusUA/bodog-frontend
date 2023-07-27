import { Table } from 'flowbite-react'
import Week from '../../../interfaces/gameweek'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

interface PropsTypes {
    week: Week
}

function WeekRow({ week }: PropsTypes) {

const navigate = useNavigate()

    return (
        <Table.Row className={`dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-[#e8000036]`} onClick={e => navigate(`/admin/week/${week.id}`)}>
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