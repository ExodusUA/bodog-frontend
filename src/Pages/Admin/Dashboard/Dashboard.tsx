import React, { useEffect } from 'react'
import './Dashboard.css'
import DashboardInfo from './DashboardInfo/DashboardInfo'
import teamLogotype from '../../../images/teamLogo.png'
import getStatistic from '../../../requests/stats'
import Statistic from '../../../interfaces/statistic'

interface PropsTypes {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>,
  stats: Statistic | null
}

function Dashboard({ setSelectedPage, stats }: PropsTypes) {

  setSelectedPage('Dashboard')

  return (
    <div className='h-full'>
      <div className='w-full rounded-[12px] md:pl-6 md:pr-6 md:pt-4 h-full'>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4 md:gap-10 h-full overflow-auto sm:overflow-none '>
          <DashboardInfo title={stats?.allUsers} text={'Entries'} />
          <DashboardInfo title={stats?.survivors} text={'Survivors'} />
          <DashboardInfo title={stats?.team?.FullName} text={'Most picked this week'} teamLogotype={stats?.team?.WikipediaLogoURL} />
          <DashboardInfo title={stats?.currentWeek} text={'Current game week'} />
        </div>
      </div>
    </div>

  )
}

export default Dashboard