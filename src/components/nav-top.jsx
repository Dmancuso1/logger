import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const NavTop = (props) => {
  const [firstName, setFirstName] = useState("");

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
          {props.isLoggedIn ? <NavLink className="" to="/login">Logout</NavLink> : (<NavLink className="" to="/logout">Login</NavLink>)}
        </li>
      </ul>
    </>
  )
};

export default NavTop;