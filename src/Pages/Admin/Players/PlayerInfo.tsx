import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import PlayerWeekRow from './PlayerWeekRow'
import User from '../../../interfaces/user'
import userAPI from '../../../requests/user'
import { ArrowUturnLeftIcon, BackspaceIcon, BackwardIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

/* INTERFACES */


function PlayerInfo() {

  const [userData, setUserData] = useState<User | undefined>(undefined);

  useEffect(() => {

    const userID = window.location.pathname.split('/')[3] //3 індекс, тобто admin/player/167

    const user = userAPI.getUserByID(userID)

    user.then((response) => {
      setUserData(response)
    }).catch((error) => {
      console.log(error)
    })

  }, [])


  return (
    <div className='w-full h-full rounded-[12px] p-6'>

      <p className='font-bold text-4xl color-dark font-title'>Players list</p>

      <Link to={'/admin/players'} className='mt-6 flex items-center gap-2 breadcrumbs'>
        <ArrowUturnLeftIcon className='w-4 h-4 text-gray' />
        <p>Back to the players list</p>
      </Link>

      <div className='bg-white p-6 mt-6 rounded-[8px]'>
        <div className='flex justify-between items-center min-h-[30px]'>
          <p className='font-bold text-[20px] text=[#111928]'>{userData?.Username}</p>
          <div className='flex gap-4 items-center'>
            <p className='text-gray'>{userData?.Email}</p>
          </div>
        </div>

        <Table striped className='mt-10'>
          <Table.Head className='bg-[#F9FAFB]'>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
              Gameweek
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
              Team picked
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
              Status
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            <PlayerWeekRow />
            <PlayerWeekRow />
            <PlayerWeekRow />
          </Table.Body>

        </Table>

      </div>
    </div>
  )
}

export default PlayerInfo