import { Table } from 'flowbite-react'
import React, { useEffect } from 'react'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Game from '../../../interfaces/game'
import getGames from '../../../requests/games'
import GameRow from './GameRow'

/* INTERFACES */


function WeekInfo() {

  const [gamesData, setGamesData] = React.useState<Game[] | null>(null)
  const weekID = Number(window.location.pathname.split('/')[3])


  useEffect(() => {

    
    const gamesData = getGames(weekID)

    gamesData.then((data: Game[]) => {
      console.log(data)
      setGamesData(data)
    })

  }, [])


  return (
    <div className='w-full h-full rounded-[12px] p-6'>

      <p className='font-bold text-4xl color-dark font-title'>Gameweek {weekID}</p>

      <Link to={'/admin/fixtures'} className='mt-6 flex items-center gap-2 breadcrumbs'>
        <ArrowUturnLeftIcon className='w-4 h-4 text-gray' />
        <p>Back to the fixtures list</p>
      </Link>

      <div className='bg-white p-6 mt-6 rounded-[8px] overflow-y-auto h-[80vh]'>
      
        <Table striped className='mt-10'>
          <Table.Head className='bg-[#F9FAFB]'>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
              Date
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
              Time
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold text-right'>
              Team 1
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold text-right px-2'>

            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
              Team 2
            </Table.HeadCell>
          </Table.Head>


          <Table.Body className="divide-y ">

            {
              gamesData !== null
                ? gamesData?.map((game: Game) => (
                  <GameRow game={game} key={game.Id} />
                ))
                : null
            }

          </Table.Body>



        </Table>

      </div>
    </div>
  )
}

export default WeekInfo