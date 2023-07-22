import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='inline-block align-middle'>
        <p className='font-title text-red text-4xl'>404: Page Not Found</p>
        <Link to='/' className='w-full block text-center'>
          <button className='py-2 px-4 bg-red text-white rounded-2xl mt-6'>Go back to home page</button>
        </Link>
      </div>
    </div>
  )
}

export default Error404