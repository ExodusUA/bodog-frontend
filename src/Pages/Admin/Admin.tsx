import React, { useEffect, useState } from 'react'
import './Admin.css'
import Dashboard from './Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Menu from './Menu/Menu'
import Players from './Players/Players'
import PlayerInfo from './Players/PlayerInfo'
import logotype from '../../images/logotype.svg'
import Settings from '../Settings/Settings'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Fixtures from './Fixtures/Fixtures'
import WeekInfo from './Fixtures/WeekInfo'

function Admin() {

  const [selectedPage, setSelectedPage] = useState<string>('')

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [selectedPage])

  return (
    <section className='admin bg-[#F4F4F4] overflow-hidden'>
      <div className="adminWrapper">
        <div className='hidden xl:block'>
          <Menu selectedPage={selectedPage} />
        </div>

        <div className='fixed flex justify-between items-center top-0 left-0 bg-white shadow-lg py-4 z-10 w-full p-8 xl:hidden'>
          <img src={logotype} alt="Logotype" />
          <Bars3Icon className='w-8 h-8 text-gray-500 cursor-pointer' onClick={e => setMobileMenuOpen(!mobileMenuOpen)} />

          <div className={`fixed top-0 ease-in-out duration-300  ${mobileMenuOpen === true ? 'left-0' : 'left-[-100%]'}`}>
            <Menu selectedPage={selectedPage} />
          </div>
        </div>

        <div className='w-full p-3 h-screen box-border scroll pt-20 xl:pt-0'>

          <Routes>
            <Route path='/' element={<Dashboard setSelectedPage={setSelectedPage} />} />
            <Route path='/players' element={<Players setSelectedPage={setSelectedPage} />} />
            <Route path='/player/*' element={<PlayerInfo />} />
            <Route path='/fixtures/' element={<Fixtures setSelectedPage={setSelectedPage} />} />
            <Route path='/week/*' element={<WeekInfo />} />
            <Route path='/settings' element={<Settings setSelectedPage={setSelectedPage} />} />
          </Routes>

        </div>

      </div>

    </section>
  )
}

export default Admin