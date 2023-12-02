import React from 'react'
import './Note.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='nav'>
    <Link to = {'/'} style={{cursor :"pointer",all:"unset"}}>
    <h1 className='nav-heading' style={{cursor:"pointer"}}>
        Notes
    </h1>
    </Link>
    <Link className='tree' to='/Tree'>Tree</Link>
    

    </div>
  )
}

export default Navbar