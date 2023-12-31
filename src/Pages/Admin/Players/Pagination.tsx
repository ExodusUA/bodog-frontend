import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userAPI from '../../../requests/user';



interface Props {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    maxPage: number
}

const selectedColor = 'bg-red text-white'

function Pagination({ currentPage, setCurrentPage, maxPage }: Props) {

    const [pagesArray, setPagesArray] = useState<number[]>([])
    const navigate = useNavigate()

    useEffect(() => {

        let pagesArray: number[] = []

        for (let i = 1; i <= maxPage; i++) {
            pagesArray.push(i)
        }

        setPagesArray(pagesArray)
    }, [maxPage])

    function nextPage() {
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    async function getUsersDownloadLink() {
        const res = userAPI.exportUsers();
        
        res.then((res) => {
            window.location.replace(process.env.REACT_APP_API_URL + res.path);
        });
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 bg-white py-3 pt-8">
            <button className='mb-4 md:mb-0 w-full justify-center text-center md:w-[150px] flex items-center bg-red rounded-lg p-2 gap-2 px-4 duration-300 hover:opacity-50 text-white font-bold' onClick={e => getUsersDownloadLink()}>Export Users</button>
            <div className="flex w-full justify-end">

                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

                        <Link onClick={e => previousPage()} to="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>

                        {
                            pagesArray.map((page, index) => (
                                currentPage === page - 1 || currentPage === page + 1 || currentPage === page
                                    ? currentPage === maxPage - 1 || currentPage === maxPage
                                        ? null
                                        : <Link onClick={e => setCurrentPage(page)} key={index} to="#" className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex ${currentPage === page ? selectedColor : ''} `} >
                                            {page}
                                        </Link>
                                    : null
                            ))
                        }

                        {
                            maxPage > 2
                                ? <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                    ...
                                </span>
                                : null
                        }

                        {
                            pagesArray.map((page, index) => (
                                page === maxPage - 1 || page === maxPage
                                    ? <Link to="#" key={index} onClick={e => setCurrentPage(page)} className={`relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 md:inline-flex ${currentPage === page ? selectedColor : ''}`} >
                                        {page}
                                    </Link>
                                    : null
                            ))
                        }

                        <Link to="#" onClick={e => nextPage()} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>

                    </nav>
                </div>
            </div>
        </div>

    )
}

export default Pagination