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
          {props.user ? (<NavLink className="" to="/">Logout</NavLink>) : (<Link to="/login">Login</Link>)}
        </li>
      </ul>
    </>
  )
};

export default NavTop;