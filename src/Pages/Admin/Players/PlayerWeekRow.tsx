import React from 'react'
import { Table } from 'flowbite-react'

interface PropsWeekRow {
  data: {
    Week: number,
    status: number,
    teamLogo: string,
    teamName: string,
  }
}

function PlayerWeekRow(data: PropsWeekRow) {

  return (
    <Table.Row className={`dark:border-gray-700 dark:bg-gray-800`}>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <p>
          Week {data.data.Week}
        </p>
      </Table.Cell>
      <Table.Cell>
        <div className='flex items-center gap-2'>
          <img src={data.data.teamLogo} alt="Team Logo" className='w-8 h-8' />
          {data.data.teamName}
        </div>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {
          data.data.status === 0 || data.data.status === 2
            ? <span className="inline-flex items-center rounded-md px-2 pb-1 text-xs font-medium text-white ring-inset uppercase font-title bg-[#D7AA50]">Active</span>
            : <span className="inline-flex items-center rounded-md bg-[#E80000] text-white px-2 pb-1 text-xs font-medium text-red-700 uppercase font-title">deceased</span>
        }
      </Table.Cell>

    </Table.Row>
  )
}

export default PlayerWeekRow