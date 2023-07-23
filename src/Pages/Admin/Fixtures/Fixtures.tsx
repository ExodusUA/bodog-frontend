import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

import WeekRow from './WeekRow'
import Week from '../../../interfaces/gameweek'

/* INTERFACES */

interface PropsTypes {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>
}

function Fixtures({ setSelectedPage }: PropsTypes) {

  setSelectedPage('Fixtures')

  const [weeks, setWeeks] = useState<Week[]>([
    {
      id: 1,
      time: '2021-08-13T18:00:00.000Z',
      players: 453,
      playersProgressed: 231
    }
  ]) //main aray of weeks


  /* GETTING WEEKS LIST */

  useEffect(() => {

  }, [])

  return (
    <div className='w-full h-full rounded-[12px] p-6'>
      <div className='block md:flex justify-between items-center'>
        <p className='font-bold text-4xl color-dark font-title mb-4'>Fixture list</p>
      </div>

      <div className='bg-white p-6 mt-16 rounded-[8px]'>

        <div className='overflow-auto h-[400px] lg:overflow-hidden lg:h-full'>
          <Table striped className='mt-10'>
            <Table.Head className='bg-[#F9FAFB]'>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Gameweek
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Cut off time
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold max-[200px]'>
                Players made pick
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Players progressed
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {
                weeks.length > 0
                  ? weeks.map((week, index) => (
                    <WeekRow week={week} key={index} />
                  ))
                  : null
              }

            </Table.Body>
          </Table>
        </div>
        {
          weeks.length === 0
            ? <p className='text-center my-3 text-gray'>No weeks found</p>
            : null
        }


      </div>
    </div>
  )
}

export default Fixtures