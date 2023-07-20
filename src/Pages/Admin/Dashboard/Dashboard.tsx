import React, { useEffect } from 'react'
import './Dashboard.css'
import DashboardInfo from './DashboardInfo/DashboardInfo'

interface PropsTypes {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>
}

function Dashboard({ setSelectedPage }: PropsTypes) {
  
  setSelectedPage('Dashboard')

  return (
    <div className='h-full'>
      <div className='w-full rounded-[12px] p-6 bg-white'>
        <div className='grid grid-cols-4 gap-10'>
          <DashboardInfo title={'1,999'} text={'Entries'} />
          <DashboardInfo title={'550'} text={'Survivors'} />
          <DashboardInfo title={'Chicago Bears'} text={'Most picks this week'} />
          <DashboardInfo title={'Gameweek 3'} text={'Current GW'} />
        </div>
      </div>

      <div className='w-full h-[80%] rounded-[12px] p-6 bg-white my-4 box-border'>
       
      </div>
    </div>

  )
}

export default Dashboard