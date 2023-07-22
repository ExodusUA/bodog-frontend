import React from 'react'
import { useEffect } from 'react'

interface PropsTypes {
    closeHandler: React.Dispatch<React.SetStateAction<boolean>>
    text: string,
    type: string
}

function Alert({ closeHandler, text, type }: PropsTypes) {


    useEffect(() => {
        setTimeout(() => {
            closeHandler(false)
        }, 5000)
    }, [])

    return (
        <div className='fixed z-1000 right-4 bottom-4' style={{ zIndex: 999 }}>
            <div id="alert-border-3" className={`flex items-center p-4 mb-4 ${type !== 'error' ? 'text-green-800' : 'text-red'} border-t-4 ${type !== 'error' ? 'border-green-300' : 'border-red'} bg-gray-50`} role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ml-3 text-sm font-medium mr-2">
                    {text}
                </div>
                <button type="button" onClick={e => closeHandler(false)} className={`ml-auto -mx-1.5 -my-1.5 bg-white ${type !== 'error' ? 'text-green-500' : 'text-red'} rounded-lg focus:ring-2 ${type !== 'error' ? 'focus:ring-green-400' : 'focus:ring-red'} p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8`} data-dismiss-target="#alert-border-3" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Alert