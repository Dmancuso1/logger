import React from 'react';
import { NavLink, Link } from "react-router-dom";

const NavTop = (props) => {

  console.log("PROPS", props)

  return (

    <>
      <ul>
        <li>
          <NavLink className="" to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className="" to="/register">Register</NavLink>
        </li>
        <li>
          {props.token ? (<NavLink className="" to="/">Logout</NavLink>) : (<Link to="/login">Login</Link>)}
        </li>
        {props.token ? <li><NavLink className="" to="/dashboard">My Dashboard</NavLink></li> : null}
      </ul>
    </>
  )
};

export default NavTop;