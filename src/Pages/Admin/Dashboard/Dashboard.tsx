import React, { useEffect } from 'react'
import './Dashboard.css'
import DashboardInfo from './DashboardInfo/DashboardInfo'
import teamLogotype from '../../../images/teamLogo.png'

interface PropsTypes {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>
}

function Dashboard({ setSelectedPage }: PropsTypes) {
  
  setSelectedPage('Dashboard')

  return (
    <div className='h-full'>
      <div className='w-full rounded-[12px] p-6 md:p-12 h-full'>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-10 h-full overflow-auto'>
          <DashboardInfo title={'2,999'} text={'Entries'} />
          <DashboardInfo title={'1,224'} text={'Survivors'} />
          <DashboardInfo title={'Chicago bears'} text={'Most picked this week'} teamLogotype={teamLogotype} />
          <DashboardInfo title={'2'} text={'Current game week'} />
        </div>
      </div>
    </div>

  )
}

export default Dashboard