import React from 'react';
import PlacesMapApi from './places-map-api';
import { Redirect } from "react-router-dom";
require('dotenv').config();


const Dashboard = (props) => {
  console.log("props from dashboard ", props)
  const baseApiUrl = process.env.REACT_APP_BASE_SERVER_URL;
  return (
    <>
      { props.token ? null : <Redirect to="/" />}
      <h1>{props.localUser.email ? `${props.localUser.email}'s` : null} Dashboard</h1>
      <img src={`${baseApiUrl}${props.localUser.avatar}`} width="300" height="auto" />
      <PlacesMapApi />
    </>
  )
}

export default Dashboard;