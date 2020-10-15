import React, { useState } from 'react';
const axios = require('axios');


const Register = (props) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userObj = {
      fName,
      lName,
      email,
      password
    }
    console.log("USER OBJ", userObj)
    axios.post('/adduser', userObj)
    .then(function (res) {
      // pass
      console.log("POST TO SERVER", res)
      localStorage.setItem("accessToken", res.data.accessToken);
      props.setToken(res.data.accessToken)
    }).catch(function (err) {
      // fail
      console.log("ERROR POST TO SERVER", err)
    })

    setFName("");
    setLName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  }


  return (
    <>
    <h1>Register</h1>
    <form className="" onSubmit={handleSubmit}>
        <label>
          <p><span>*First Name:</span>
            <input
              type="text"
              value={fName}
              placeholder="First Name"
              onChange={e => setFName(e.target.value)}
              required
            />
          </p>
        </label>
        <label>
          <p><span>*Last Name:</span>
            <input
              type="text"
              value={lName}
              placeholder="Last Name"
              onChange={e => setLName(e.target.value)}
              required
            />
          </p>
        </label>
        <label>
          <p><span>*Email:</span>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </p>
        </label>
        <label>
          <p><span>*Password: </span>
            <input
              type="text"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </p>
        </label>
        <label>
          <p><span>*Confirm Password:</span>
            <input
              type="text"
              value={confirmPassword}
              placeholder="Re-type password"
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </p>
        </label>
        <input className="" type="submit" value="Submit" />
      </form>

    </>
  )
}

export default Register;