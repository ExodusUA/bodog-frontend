import React from 'react'
import { Table } from 'flowbite-react'

function PlayerWeekRow() {
  return (
    <Table.Row className={`dark:border-gray-700 dark:bg-gray-800`}>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <p>
          Week 1
        </p>
      </Table.Cell>
      <Table.Cell>
        Chicago bears
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {
          true === true
            ? <span className="inline-flex items-center rounded-md px-2 pb-1 text-xs font-medium text-white ring-inset uppercase font-title bg-[#D7AA50]">Active</span>
            : <span className="inline-flex items-center rounded-md bg-[#E80000] text-white px-2 pb-1 text-xs font-medium text-red-700 uppercase font-title">deceased</span>
        }
      </Table.Cell>

    </Table.Row>
  )
}

export default PlayerWeekRow