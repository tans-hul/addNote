import React from 'react'
import './Note.css'
import { Link } from "react-router-dom";

const Navbar = ({setisLogin}) => {
  const logoutSubmit = async () => {
    localStorage.clear();
    setisLogin(false);
  };
  return (
    <div className='nav'>
    <Link to = {'/'} style={{cursor :"pointer",all:"unset"}}>
    <h1 className='nav-heading' style={{cursor:"pointer"}}>
        Notes
    </h1>
    </Link>
    <section
        onClick={() => {
          logoutSubmit();
        }}
      >
        <Link to="/">
          <button className="logoutbtn">Logout</button>
        </Link>
      </section>

    
    

    </div>
  )
}

export default Navbar