import React, { useState } from 'react'
import { Redirect} from "react-router-dom";
const axios = require('axios');


const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userObj = {
      email,
      password
    }
    // add loading element here
    setStatus(true)

    axios.post('/login', userObj)
      .then(function (res) {
        // pass
        setStatus(false)
        console.log('returned from server" ', res)
        const localUserObj = {
          email: res.data.currentUser.email,
          avatar: res.data.currentUser.avatar.path,
          address: res.data.currentUser.address,
          lat: res.data.currentUser.lat,
          lng: res.data.currentUser.lng
        };
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("localUser", JSON.stringify(localUserObj));
        props.login(localUserObj, res.data.accessToken)
      })
      .catch(function (err) {
        //fail 
        setStatus(false)
        console.log("ERROR RETURNING FROM SERVER ", err)
      })

    setEmail("");
    setPassword("");

  }

  return (
    <>
      <h1>Login</h1>
      <form className="" onSubmit={handleSubmit}>
        <label>
          <p><span>*Email</span>
            <input
              type="text"
              value={email}
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </p>
        </label>
        <label>
          <p><span>*Password</span>
            <input
              type="text"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </p>
        </label>
        <input className="" type="submit" value="submit" />
      </form>
      {status ? <p>Loading...</p> : null}
      {props.token? <Redirect to="/dashboard"></Redirect> : null}

    </>
  )
};

export default LoginPage