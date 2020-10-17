import React from 'react';

const Dashboard = (props) => {
  console.log("props from dashboard ", props)
  return (
    <>
    <h1>{props.localUser ? `${props.localUser}'s` : null} Dashboard</h1>

    </>
  )
}

export default Dashboard;