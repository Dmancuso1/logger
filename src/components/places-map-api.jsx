import React, { useEffect } from 'react';
require('dotenv').config();
const axios = require('axios');

const PlacesMapApi = (props) => {
  console.log('props from maps', props)
  const ApiKey = process.env.REACT_APP_GOOGLE_MAPS_API
  console.log('env', ApiKey)

  // we want to get the user object from the db
  

  // first convert address to geocoords:
  // https://developers.google.com/maps/documentation/geocoding/overview?csw=1

  // then use that to query google-map-api
  //

  return (
    <>
      <h1>address:</h1>
      {/* return map here */}

    </>
  )

};

 

export default PlacesMapApi;