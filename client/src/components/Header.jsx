import React from 'react'
import '../assets/css/App.css'
import logo from '../assets/img/logo.png';

function Header() {
  return (
    <>
        <header  className="App-header">
        <a href='/'><img className='logo' src={logo} alt='logo'/></a>
        <p><a id='comp_name' href='/'>Nile Add</a></p>
        <ul id='navbar'>
          <li ><a href='/'>Home</a> </li>
          <li ><a href='/our-partners'>Partners</a> </li>
          <li><a href='/about-us'>About Us</a> </li>
          <li><a href='/contact-us'>Contact Us</a> </li>
        </ul>
      </header>
    </>
  )
}

export default Header
