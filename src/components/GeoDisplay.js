import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import HomeMarker from './HomeMarker'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'


const GeoDisplay = () => {
  const homeGPS = useSelector(state => state.placesReducer.homeGPS)
  const geoData = useSelector(state => state.placesReducer.nearbyPlaces)

  let center
  if (homeGPS) {
    center = {
      lat: homeGPS.lat,
      lng: homeGPS.lon
    }
  } else {
    center = {
      lat: 0,
      lon: 0
    }
  }
  const dCent = {
    lat: 46,
    lng: 74
  }
  const zoom = 13

  //is there a better way to protect this key? GoogleMapReact needs it so I can't move it to the server
  const key = process.env.REACT_APP_GOOGLE_KEY

  if (!geoData || !homeGPS) {
    return null
  }
  return (
    <div className='mapDiv'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20 }}><strong>Locations</strong></Typography>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={dCent}
        defaultZoom={zoom}
        center={center}>
        {geoData && geoData.length > 0 ?
          <HomeMarker
            lat={homeGPS.lat}
            lng={homeGPS.lon}
            name='Me' />
          : null
        }

        {
          geoData && geoData.length > 0 ?
            geoData.map(place =>
              <MapMarker key={place.place_id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                name={place.name}
                place_id={place.place_id}
              />
            )
            :
            null}
      </GoogleMapReact>
    </div >
  )
}
export default GeoDisplay