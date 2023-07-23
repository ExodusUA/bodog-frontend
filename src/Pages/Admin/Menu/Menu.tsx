import './Menu.css'
import logotype from '../../../images/logotype.svg'
import { Link } from 'react-router-dom'
import { HomeIcon, UsersIcon, ListBulletIcon, Cog8ToothIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'

interface PropsTypes {
    selectedPage: string
}

function Menu({ selectedPage }: PropsTypes) {

    const activeLink = 'bg-red text-white activeMenuLink'

    return (
        <div className="p-3 h-screen box-border">
            <div className='bg-white w-64 md:w-96 h-full rounded-[12px] p-6 drop-shadow-2xl'>
                <div className='flex justify-start'>
                    <img className='w-32 text-left mb-9' src={logotype} alt="Logotype" />
                </div>

                <div className='h-full flex flex-col justify-between'>
                    <div className='flex flex-col'>
                        <Link to='/admin' className={`menuLink flex items-center py-3 px-3 mb-3 duration-300 gap-3 rounded-[6px] hover:bg-red ${selectedPage === 'Dashboard' && activeLink}`}>
                            <HomeIcon className={`w-6 h-6 text-dark`} />
                            <p className='text-dark text-4 font-normal block'>Dashboard</p>
                        </Link>

                        <Link to='/admin/players' className={`menuLink flex items-center py-3 px-3 mb-3 duration-300 gap-3 rounded-[6px] hover:bg-red ${selectedPage === 'Players' && activeLink}`}>
                            <UsersIcon className={`w-6 h-6 text-dark ${selectedPage === 'Players' ? 'text-white' : ''}`} />
                            <p className='text-dark text-4 font-normal block'>Players List</p>
                        </Link>

                        <Link to='/admin/fixtures' className={`menuLink flex items-center py-3 px-3 mb-3 duration-300 gap-3 rounded-[6px] hover:bg-red ${selectedPage === 'Fixtures' && activeLink}`}>
                            <UsersIcon className={`w-6 h-6 text-dark ${selectedPage === 'Fixtures' ? 'text-white' : ''}`} />
                            <p className='text-dark text-4 font-normal block'>Fixture List</p>
                        </Link>

                    </div>

                    <div className='border-t-[1px] border-slate-300 pb-10 pt-6 mt-auto'>
                        <Link to='/admin/settings' className={`menuLink flex items-center py-3 px-3 mb-3 duration-300 gap-3 rounded-[6px] hover:bg-red ${selectedPage === 'Settings' && activeLink}`}>
                            <Cog8ToothIcon className='w-6 h-6 text-dark' />
                            <p className='text-dark text-4 font-normal block'>Settings</p>
                        </Link>

                        <Link to='/login' onClick={e => window.localStorage.removeItem('token')} className='flex items-center py-3 px-3 mb-3 duration-300 gap-3 rounded-[6px] hover:bg-red'>
                            <ArrowRightCircleIcon className='w-6 h-6 text-dark' />
                            <p className='text-dark text-4 font-normal block'>Log Out</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu