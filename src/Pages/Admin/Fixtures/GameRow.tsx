import React from 'react'
import { Table } from 'flowbite-react'
import Game from '../../../interfaces/game'
import moment from 'moment'

interface PropsTypes {
    game: Game
}

function GameRow({ game }: PropsTypes) {

    return (
        <Table.Row className={`dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-50`}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    {moment(game.DateTime).format('DD/MM/YYYY')}
                </p>
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    {moment(game.DateTime).format('HH:mm')} GMT
                </p>
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p className='flex items-center gap-4 text-right justify-end'>
                    {game.HomeTeamName}
                    <img className='w-10' src={game.HomeTeamLogo} alt="Team Logotype" />
                </p>
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center px-2">
                @
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p className='flex items-center gap-4'>
                    <img className='w-10' src={game.AwayTeamLogo} alt="Team Logotype" />
                    {game.AwayTeamName}
                </p>
            </Table.Cell>

        </Table.Row>
    )
}

export default GameRow