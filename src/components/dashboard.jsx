import React from 'react';
import PlacesMapApi from './places-map-api';
require('dotenv').config();


const Dashboard = (props) => {
  console.log("props from dashboard ", props)
  const baseApiUrl = process.env.REACT_APP_BASE_SERVER_URL;
  return (
    <>
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
      <PlacesMapApi />
    </>
  )
}

export default Dashboard;