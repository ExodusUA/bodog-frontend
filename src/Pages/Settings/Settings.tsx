import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Table } from 'flowbite-react'
import React, { useEffect } from 'react'
import User from '../../interfaces/user'
import userAPI from '../../requests/user'
import AdminRow from './AdminRow'
import AddAdmin from '../../UI/Modals/AddAdmin'
import Alert from '../../UI/Alert/Alert'
import settings from '../../requests/settings'
import getStatistic from '../../requests/stats'


interface PropsTypes {
    setSelectedPage: React.Dispatch<React.SetStateAction<string>>
}

function Settings({ setSelectedPage }: PropsTypes) {

    setSelectedPage('Settings')

    const [admins, setAdmins] = React.useState<User[]>([])
    const [isAdminModalOpen, setIsAdminModalOpen] = React.useState<boolean>(false)
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
    const [seasonAlertOpen, setSeasonAlertOpen] = React.useState<boolean>(false)

    useEffect(() => {

        const admins = userAPI.getAdminList()

        admins.then((response) => {
            setAdmins(response)
        })

    }, [])

    const [activeWeek, setActiveWeek] = React.useState<string | number>(1)
    const [activeYear, setActiveYear] = React.useState<string | number>(2023)

    useEffect(() => {

        const res = getStatistic()

        res.then((response: any) => {
            console.log(response)
            setActiveWeek(response.currentWeek)
            setActiveYear(response.currentSeason)
        })

    }, [])

    function updateWeekYear() {

        const res = settings.changeWeekYear(activeWeek, activeYear)

        res.then((response) => {
            if (response === 'changed') {
                setSeasonAlertOpen(true)
            }
        })

    }

    return (
        <div className='w-full h-full rounded-[12px] p-6'>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-2xl md:text-4xl color-dark font-title'>Settings</p>

                <div className='flex items-center gap-10'>
                    <div className='items-center flex relative'>
                        <button className='flex items-center bg-red rounded-lg p-2 gap-2 duration-300 hover:opacity-50' onClick={e => setIsAdminModalOpen(true)}>
                            <PlusCircleIcon className='w-6 h-6 text-white' />
                            <p className='text-white text-[14px] font-bold'>Add Admin</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className='bg-white p-6 mt-16 rounded-[8px] h-[90%] pb-4'>

                <div className='mb-10'>
                    <p className='font-bold text-[20px] text=[#111928]'>Testing tool</p>

                    <div className='flex gap-2 items-center'>
                        <p>Current Week & Year:</p>
                        <select className='' name="weekSelect" id="weekSelect" value={activeWeek} onChange={e => setActiveWeek(e.target.value)}>
                            {
                                Array.from(Array(19).keys()).slice(1).map((week, index) => (
                                    <option key={index} value={week}>{week}</option>
                                ))
                            }
                        </select>

                        <select className='' name="yearSelect" id="yearSelect" value={activeYear} onChange={e => setActiveYear(e.target.value)}>
                            {
                                [2022, 2023].map((week, index) => (
                                    <option key={index} value={week}>{week}</option>
                                ))
                            }
                        </select>

                        <button onClick={e => updateWeekYear()} className='flex items-center bg-red rounded-lg p-2 gap-2 px-4 duration-300 hover:opacity-50 text-white font-bold'>Save</button>
                    </div>

                </div>


                <div className='overflow-auto h-[100%]'>

                    <p className='font-bold text-[20px] text=[#111928]'>Total Admins: {admins.length}</p>

                    <Table striped className='mt-10' >
                        <Table.Head className='bg-[#F9FAFB]'>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Username
                            </Table.HeadCell>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Email
                            </Table.HeadCell>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Registration Date
                            </Table.HeadCell>
                            <Table.HeadCell className='capitalize text-[14px] text-lightGray text-bold'>
                                Actions
                            </Table.HeadCell>
                        </Table.Head>

                        <Table.Body className="divide-y">
                            {
                                admins.map((admin, index) => (
                                    <AdminRow user={admin} key={index} admins={admins} setAdmins={setAdmins} />
                                ))
                            }
                        </Table.Body>

                    </Table>
                </div>
            </div>
            {
                isAdminModalOpen && <AddAdmin setIsModalOpen={setIsAdminModalOpen} setAlertOpen={setAlertOpen} admins={admins} setAdmins={setAdmins}></AddAdmin>
            }

            {
                alertOpen && <Alert type={'done'} text='Admin added successfully!' closeHandler={setAlertOpen} />
            }

            {
                seasonAlertOpen && <Alert type={'done'} text='Current week & season saved!' closeHandler={setSeasonAlertOpen} />
            }
        </div>
    )
}

export default Settings