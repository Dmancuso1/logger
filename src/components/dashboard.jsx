import React from 'react';
import PlacesMapApi from './places-map-api';



const Dashboard = (props) => {
  console.log("props from dashboard ", props)
  return (
    <>
      <h1>{props.localUser ? `${props.localUser}'s` : null} Dashboard</h1>
      <PlacesMapApi />
    </>
  )
}

export default Dashboard;