import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import PlayerRow from './PlayerRow'
import Pagination from './Pagination'
import User from '../../../interfaces/user'
import userAPI from '../../../requests/user'

/* INTERFACES */

interface PropsTypes {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>
  setSelectedUser?: React.Dispatch<React.SetStateAction<User[]>>
}

function Players({ setSelectedPage }: PropsTypes) {

  const usersPerPage = 50;
  setSelectedPage('Players')

  const [users, setUsers] = useState<User[]>([]) //main aray of users
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const [usersCount, setUsersCount] = useState<number>(4)

  /* OPTIONAL PARAMETRS */

  const [streakFilter, setStreakFilter] = useState<boolean | null>(null) //true - max, false - min
  const [isAliveFilter, setisAliveFilter] = useState<boolean | null>(null) //true - active, false - deceased
  const [aliveSorter, setAliveSorter] = useState<boolean | null>(null) //true - active, false - deceased


  useEffect(() => {

    let pagesCount = Math.ceil(usersCount / usersPerPage)
    setMaxPage(pagesCount)

  }, [usersCount])

  /* GETTING USERS LIST */

  useEffect(() => {

    let firstId = (currentPage - 1) * usersPerPage;
    let lastId = (currentPage - 1) * usersPerPage + usersPerPage

    let params = {
      firstId: firstId,
      lastId: lastId,
    }


    const users = userAPI.fetchUsers(firstId, lastId, isAliveFilter === true && isAliveFilter, streakFilter !== null ? streakFilter : null, aliveSorter !== null ? aliveSorter : null)

    users.then((response) => {
      setUsers(response.users)
      setUsersCount(response.allUsers)
    })

  }, [usersPerPage, isAliveFilter, streakFilter, aliveSorter])


  /* SEARCH USERS */

  function searchUsers(keyword: string) {

    const users = userAPI.searchUsers(keyword)

    users.then((response) => {
      console.log(response)
      setUsers(response)

    }).catch((error) => {
      console.log(error)
    })

  }

  /* SORT BY STATUS */

  useEffect(() => {

    let newData = [...users]

    if (isAliveFilter === true) {
      newData.sort((a, b) => {
        if (a.IsAlive === true) {
          return -1
        } else {
          return 1
        }
      })
      setUsers(newData)
    } else {
      newData.sort((a, b) => {
        if (a.IsAlive === false) {
          return -1
        } else {
          return 1
        }
      })
      setUsers(newData)
    }

  }, [isAliveFilter])


  return (
    <div className='w-full h-full rounded-[12px] p-6'>
      <div className='block md:flex justify-between items-center'>
        <p className='font-bold text-4xl color-dark font-title mb-4'>Players list</p>

        <div className='flex items-center gap-10'>
          <div className='items-center flex relative w-full sm:w-[400px]'>
            <MagnifyingGlassIcon className='w-5 h-6 absolute left-3 top-2.1' />
            <input onChange={e => searchUsers(e.target.value)} className='rounded-[12px] w-full pl-10 border-[#D1D5DB]  ring-0 focus:border-[#E80000] focus:ring-0' type="text" name="search" id="search" placeholder='Search all players' />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 mt-16 rounded-[8px]'>
        <div className='block sm:flex justify-between items-center'>
          <p className='font-bold text-[20px] text=[#111928]'>Total Players: {usersCount}</p>
          <div className='flex gap-4 items-center'>
            <label htmlFor="selectAlive" className='text-gray'>Show active users only</label>
            <input type="checkbox" id='selectAlive' value={isAliveFilter ? "true" : "false"} onClick={e => setisAliveFilter(!isAliveFilter)} />
          </div>
        </div>

        <div className='overflow-auto h-[400px] lg:overflow-hidden lg:h-full'>
          <Table striped className='mt-10'>
            <Table.Head className='bg-[#F9FAFB]'>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Username
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Fullname
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold max-[200px]'>
                Email
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Latest pick
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold gap-1 select-none cursor-pointer' onClick={e => setAliveSorter(!aliveSorter)}>
                <div className='flex gap-1'>
                  Status
                  {
                    aliveSorter ? <ChevronUpIcon className='w-4 h-4 text-gray font-bold' /> : <ChevronDownIcon className='w-4 h-4 text-gray font-bold' />
                  }
                </div>
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold select-none cursor-pointer' onClick={e => setStreakFilter(!streakFilter)}>
                <div className='flex gap-1'>
                  Streak
                  {
                    streakFilter ? <ChevronDownIcon className='w-4 h-4 text-gray font-bold' /> : <ChevronUpIcon className='w-4 h-4 text-gray font-bold' />
                  }
                </div>

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
        </div>
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