import React from 'react';
import { Redirect } from 'react-router-dom';
import Dane from './react-google-maps';
require('dotenv').config();


const Dashboard = (props) => {
  // console.log("props from dashboard ", props)
  const baseApiUrl = process.env.REACT_APP_BASE_SERVER_URL;
  return (
    <>
      {!localStorage.getItem("accessToken") ? <Redirect to="/"></Redirect> : null}
      <h1>{props.localUser.email ? `${props.localUser.email}'s` : null} Dashboard</h1>
      <img src={`${baseApiUrl}${props.localUser.avatar}`} width="300" height="auto" alt={props.localUser.avatar} />

      <table>
        <thead>
          <tr>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.localUser.address}</td>
          </tr>
        </tbody>
      </table>
      <Dane props = { props } />
    </>
  )
}

export default Dashboard;