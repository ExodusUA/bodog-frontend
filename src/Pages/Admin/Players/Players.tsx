import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import PlayerRow from './PlayerRow'
import Pagination from './Pagination'
import User from '../../../interfaces/user'
import userAPI from '../../../requests/user'

/* INTERFACES */

interface PropsTypes {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>
}

function Players({ setSelectedPage }: PropsTypes) {

  const usersPerPage = 50;
  setSelectedPage('Players')

  const [users, setUsers] = useState<User[]>([]) //main aray of users
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const [usersCount, setUsersCount] = useState<number>(4)

  useEffect(() => {

    let pagesCount = Math.ceil(usersCount / usersPerPage)
    setMaxPage(pagesCount)

  }, [usersCount])

  /* GETTINGS USERS LIST */

  useEffect(() => {

    const users = userAPI.fetchUsers((currentPage - 1) * usersPerPage, (currentPage - 1) * usersPerPage + usersPerPage)

    users.then((response) => {
      setUsers(response)
    })

  }, [usersPerPage])

  /* SEARCH USERS */

  function searchUsers(keyword: string) {

    const users = userAPI.searchUsers(keyword)

    users.then((response) => {
      console.log(response)
      setUsers(response)
      setUsersCount(response.length)
    })

  }


  return (
    <div className='w-full h-full rounded-[12px] p-6'>
      <div className='flex justify-between items-center'>
        <p className='font-bold text-4xl color-dark font-title'>Players list</p>

        <div className='flex items-center gap-10'>

          <div className='items-center flex relative'>
            <MagnifyingGlassIcon className='w-5 h-6 absolute left-3 top-2.1' />
            <input onChange={e => searchUsers(e.target.value)} className='rounded-[12px] w-[400px] pl-10 border-[#D1D5DB]  ring-0 focus:border-[#E80000] focus:ring-0' type="text" name="search" id="search" placeholder='Search all players' />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 mt-16 rounded-[8px]'>
        <div className='flex justify-between items-center'>
          <p className='font-bold text-[20px] text=[#111928]'>Total Players: 400</p>
          <div className='flex gap-4 items-center'>
            <label htmlFor="selectAlive" className='text-gray'>Show active users only</label>
            <input type="checkbox" id='selectAlive' />
          </div>
        </div>

        <Table striped className='mt-10'>
          <Table.Head className='bg-[#F9FAFB]'>
            <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
              Username
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
              Fullname
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
              Email
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
              Latest pick
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
              Status
            </Table.HeadCell>
            <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
              Streak
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {
              users.length > 0
                ? users.map((user, index) => (
                  <PlayerRow user={user} key={index} />
                ))
                : null
            }

          </Table.Body>
        </Table>

        {
          users.length === 0
            ? <p className='text-center my-3 text-gray'>No users found</p>
            : null
        }

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage} />


      </div>
    </div>
  )
}

export default Players