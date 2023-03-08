import React from 'react'
import Navbar from "../Navbar/Navbar";
import './Header.css'
import logo from './icon-left-font-monochrome-white.png'

const Header = () => {
  return (
    <div className='header_wrapper'>
        <img src={logo} alt='company logo'/>
        <Navbar/>
    </div>
  )
}

export default Header