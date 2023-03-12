import React from 'react'
import Navbar from "../Navbar/Navbar";
import './Header.css'
import logo from './icon-left-font-monochrome-white.png'

const Header = ({user}) => {
  return (
    <div className='header_wrapper'>
        <img src={logo} alt='company logo'/>
        <Navbar user={user}/>
    </div>
  )
}

export default Header