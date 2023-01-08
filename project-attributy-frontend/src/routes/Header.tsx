import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
        <h1 style={{color: "lightblue"}}>SpaceX</h1>
        <div className='route-names'>
            <NavLink className="route-names-item" to='/missions'>Main Page</NavLink>
        </div>
    </header>
  )
}

export default Header