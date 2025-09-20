
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-purple-500 text-white py-3'>
      <div className="logo">
        <span className='font-bold mx-8'>iTask</span>
      </div>
      <ul className="flex gap-8 mx-8">
         <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
         <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar