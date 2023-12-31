import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Week from '../../../interfaces/gameweek'
import WeekRow from './WeekRow'
import getWeeksList from '../../../requests/weeks'
import Statistic from '../../../interfaces/statistic'

interface PropsTypes {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>
  statistics: Statistic | null
}

function Fixtures({ setSelectedPage, statistics }: PropsTypes) {

  setSelectedPage('Fixtures')

  const [weeks, setWeeks] = useState<Week[]>([]) //main aray of weeks


  /* GETTING WEEKS LIST */

  useEffect(() => {

    const weeksData = getWeeksList()

    weeksData.then((data: Week[]) => {

      let filteredData = data.filter((week: Week) => week.season === Number(statistics?.currentSeason))
      console.log(statistics?.currentSeason)
      setWeeks(filteredData)
    }).catch((err) => {
      console.log(err)
    })

  }, [statistics])

  return (
    <div className='w-full h-[80vh] md:h-full rounded-[12px] p-6'>
      <div className='block md:flex justify-between items-center'>
        <p className='font-bold text-4xl color-dark font-title mb-4'>Fixture list</p>
      </div>

      <div className='bg-white p-6 mt-16 rounded-[8px]'>

        <div className='overflow-y-auto h-[60vh] md:h-[75vh]'>
          <Table striped className='mt-0'>
            <Table.Head className='bg-[#F9FAFB] sticky top-0'>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Gameweek
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Cut off time
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Players made pick
              </Table.HeadCell>
              <Table.HeadCell className='capitalize text-[14px] text-gray text-bold'>
                Players progressed
              </Table.HeadCell>
            </Table.Head>


            <Table.Body className="divide-y">
              {
                weeks.map((week, index) => (
                  <WeekRow week={week} key={index} />
                ))
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