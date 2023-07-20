import React, {useEffect, useState} from 'react'
import './Admin.css'
import Dashboard from './Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Menu from './Menu/Menu'
import Players from './Players/Players'

function Admin() {

  const [selectedPage, setSelectedPage] = useState<string>('')

  useEffect(() => {
    console.log(selectedPage)
  }, [selectedPage])

  return (
    <section className='admin bg-[#F4F4F4] overflow-hidden'>
      <div className="adminWrapper">
        <Menu selectedPage={selectedPage} />

        <div className='w-full p-3 h-screen box-border scroll'>

          <Routes>
            <Route path='/' element={<Dashboard setSelectedPage={setSelectedPage} />} />
            <Route path='/players' element={<Players setSelectedPage={setSelectedPage} />} />
          </Routes>

        </div>

      </div>

    </section>
  )
}

export default Admin