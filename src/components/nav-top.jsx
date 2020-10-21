import React from 'react';
import { NavLink, Link, Redirect } from "react-router-dom";

const NavTop = (props) => {


  return (

    <>
      { props.token ? null : <Redirect to="/" />}
      <ul>
        <li>
          <NavLink className="" to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className="" to="/register">Register</NavLink>
        </li>
        <li>
          {props.token ? (<Link className="" to="/" onClick={() => props.logout()}>Logout</Link>) : (<Link to="/login">Login</Link>)}
        </li>
        {props.token ? <li><NavLink className="" to="/dashboard">My Dashboard</NavLink></li> : null}
      </ul>
    </>
  )
};

export default NavTop;