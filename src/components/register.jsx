import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import '../App.scss';
require('dotenv').config();
const axios = require('axios');





const Register = (props) => {

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [coords, setCoords] = useState([])


  // axios request 
  useEffect(() => {
    // Get latitude & longitude from address using GeocodeAPI (rapid).
    axios({
      "method": "GET",
      "url": "https://verify-and-geocode-address.p.rapidapi.com/v1/geocode/search",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "verify-and-geocode-address.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API,
        "useQueryString": true
      }, "params": {
        "limit": "1",
        "lang": "en",
        "text": address
      }
    })
      .then((response) => {
        console.log(response)
        // make case for features[] <-- empty array
        if (response.data.features.length === 0) {
          console.log("ARRAY IS EMPTY")
          setCoords([])
        } else {
          setCoords(response.data.features[0].geometry.coordinates)
          console.log("ARRAY HAS DATA :)")
          console.log("ADDRESS COORDS", response.data.features[0].geometry.coordinates)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [address]);


  const handleSubmit = (evt) => {
    evt.preventDefault();

    setStatus(true) // spinner on

    // if no coords, exit form and alert user to enter valid address
    if (coords.length === 0) {
      console.log("NO COORDS FOUND, PLEASE ENTER A VALID ADDRESS")
      setAddress("");
      setStatus(false) // spinner off
      return
    } else {
      console.log("COORDS OKAY!", coords)
    }

    // code goes here..


    // format to match mongo obj
    let formData = new FormData();
    formData.append("fName", fName)
    formData.append("lName", lName)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("address", address)
    formData.append("avatar", avatar)
    // TODO: get long and lat from address!
    // console.log('FORMDATA', formData) // console log has no effect (but actually works)




    axios.post('/adduser', formData)
      .then(function (res) {
        // pass
        setStatus(false) // spinner off

        // console.log("HAS COORDS", coords) // works yay! 

        const localUserObj = {
          email: res.data.currentUser.email,
          avatar: res.data.currentUser.avatar.path,
          address: res.data.currentUser.address
        };

        // console.log("JSON OBJECT PARSED", localUserObj)
        // console.log("POST TO SERVER", res)
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("localUser", JSON.stringify(localUserObj));
        props.login(localUserObj, res.data.accessToken)

        setIsSignedUp(true) // (NOT WORKING) signal to redirect to dashboard(profile page)

      }).catch(function (err) {
        // fail
        setStatus(false) // spinner off
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
            {coords.length > 0 ? <span className="basic--valid--color"><small>Address okay!</small></span> : <span className="basic--invalid--color"><small>Invalid Address</small></span>}
          </p>
        </label>
        <label>
          <p><span>Upload Avatar: </span>
            <input
              type="file"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
            />
          </p>
        </label>
        <input className="" type="submit" value="Submit" />
      </form>
      {status ? <p>Loading...</p> : null}
      {isSignedUp ? <Redirect to="/dashboard"></Redirect> : null}

    </>
  )
}

export default Register;