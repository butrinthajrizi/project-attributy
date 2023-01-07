import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
        <img src='../src/assets/spacex.svg' width={350}/>
        <div className='route-names'>
            <NavLink className="route-names-item" to='/missions'>Home</NavLink>
        </div>
    </header>
  )
}

export default Header