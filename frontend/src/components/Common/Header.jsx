import React from 'react'
import TopBar from '../Layout/TopBar'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header className='border-b border-gray-200'>
        {/* Topbar */}
        <TopBar />
        {/* Navbar */}
        <NavBar />
        {/* cart drawer */}
    </header>
  )
}

export default Header