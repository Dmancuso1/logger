import React, { useState } from 'react';
const axios = require('axios');


const Register = (props) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");



  const handleSubmit = (evt) => {
    evt.preventDefault();
    // format to match mongo obj
    let formData = new FormData();
    formData.append("fName", fName)
    formData.append("lName", lName)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("address", address)
    formData.append("avatar", avatar)

    // console.log('FORMDATA', formData) // console log has no effect (but actually works)

    axios.post('/adduser', formData)
      .then(function (res) {
        // pass
        const localUserObj = {
          'email': res.data.currentUser.email,
          'avatar': res.data.currentUser.avatar.path,
          'address': res.data.currentUser.address
        };
        console.log("JSON OBJECT PARSED", localUserObj)
        console.log("POST TO SERVER", res)
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("localUser", JSON.stringify(localUserObj));
        props.setToken(res.data.accessToken);
        props.setLocalUser(localUserObj);
      }).catch(function (err) {
        // fail
        console.log("ERROR POST TO SERVER", err)
      })

    setFName("");
    setLName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAddress("");
    setAvatar("");

  }


  return (
    <>
      <h1>Register</h1>
      <form className="" onSubmit={handleSubmit} encType="multipart/form-data">
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
        <label>
          <p><span>Address</span>
            <input
              type="text"
              value={address}
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
              required
            />
          </p>
        </label>
        <label>
          <p><span>Upload Avatar: </span>
            <input
              type="file"
              name="avatar"
              // value={avatar}
              // file={avatar}
              onChange={(e) => setAvatar(e.target.files[0])}
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