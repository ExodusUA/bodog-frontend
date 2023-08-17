import React from 'react'
import { Table } from 'flowbite-react'
import Game from '../../../interfaces/game'
import moment from 'moment'
import 'moment-timezone';
import SelectWinner from '../../../UI/Modals/SelectWinner';
import Alert from '../../../UI/Alert/Alert';

interface PropsTypes {
    game: Game
}

function GameRow({ game }: PropsTypes) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const parsedDate = moment(game.DateTime);
    const userLocalDate = parsedDate.tz(userTimezone);

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)

    return (
        <>
            <Table.Row className={`dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-50`}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-[200px]">
                    <p>
                        {userLocalDate.format('DD/MM/YYYY')}
                    </p>
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-[200px]">
                    <p>
                        {userLocalDate.format('HH:mm')}
                    </p>
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-[200px]">
                    <p className='flex items-center gap-4 text-right justify-end'>
                        {game.AwayTeamCity + ' ' + game.AwayTeamName}
                        <img className='w-10' src={game.AwayTeamLogo} alt="Team Logotype" />
                    </p>
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center px-2 w-[40px]">
                    @
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-[200px]">
                    <p className='flex items-center gap-4'>
                        <img className='w-10' src={game.HomeTeamLogo} alt="Team Logotype" />
                        {game.HomeTeamCity + ' ' + game.HomeTeamName}
                    </p>
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-[200px]">
                    <p className='flex items-center gap-4'>
                        <button className='flex items-center bg-red rounded-lg p-2 gap-2 px-4 duration-300 hover:opacity-50 text-white font-bold' onClick={e => setIsModalOpen(true)}>Select Winner</button>
                    </p>
                </Table.Cell>


            </Table.Row>

            {
                isModalOpen && <SelectWinner data={game} setIsModalOpen={setIsModalOpen} setAlertOpen={setAlertOpen} />
            }

            {
                alertOpen && <Alert type={'done'} text='Team saved successfully!' closeHandler={setAlertOpen} />
            }
        </>
    )
}

export default GameRow