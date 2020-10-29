// reference: https://www.youtube.com/watch?v=Pf7g32CwX_s

import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "./component_styles/mapStyles"
require('dotenv').config();


    
const ReactGoogleMap = (props) => {
  console.log("PROPS FROM MAP", props)
  const userAddress = props.props.localUser.address
  const lat = props.props.localUser.lat
  const lng = props.props.localUser.lng

  function Map() {

    const [selectedMarker, setSelectedMarker] = useState(null)

    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat, lng }}
        defaultOptions={{styles: mapStyles, disableDefaultUI: true}}
      >
        {/* set marker(s) -- can loop here with map too  */}
        <Marker
          position={{ lat, lng }}
          onClick={() => {
            setSelectedMarker(true)
          }}
          icon={{
            url: "man.svg",
            scaledSize: new window.google.maps.Size(32, 32)
          }}
        />

        {selectedMarker && (
          <InfoWindow
          domready
            position={{
              lat,
              lng
            }}
            onCloseClick={() => {
              setSelectedMarker(null)
            }}
          >
            <>
              <h2>My Address</h2>
              <p>{userAddress}</p>
            </>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  }
  const WrappedMap = withScriptjs(withGoogleMap(Map));

  // Set the map on the page 
  const MapMain = () => {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />} />
      </div>
    )
  };


  return MapMain()


}

export default ReactGoogleMap;