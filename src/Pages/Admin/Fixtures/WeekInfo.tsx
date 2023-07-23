import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import User from '../../../interfaces/user'
import userAPI from '../../../requests/user'
import { ArrowUturnLeftIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

/* INTERFACES */


function WeekInfo() {

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

      <p className='font-bold text-4xl color-dark font-title'>Gameweek 2</p>

      <Link to={'/admin/fixtures'} className='mt-6 flex items-center gap-2 breadcrumbs'>
        <ArrowUturnLeftIcon className='w-4 h-4 text-gray' />
        <p>Back to the fixtures list</p>
      </Link>

      <div className='bg-white p-6 mt-6 rounded-[8px]'>
        
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
         
          </Table.Body>

        </Table>

      </div>
    </div>
  )
}

export default WeekInfo