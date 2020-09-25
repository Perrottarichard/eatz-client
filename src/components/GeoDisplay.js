import React, { useState, useEffect } from 'react'
import { getByCoordinates } from '../services/dataService'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import HomeMarker from './HomeMarker'

const GeoDisplay = ({ user }) => {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [geoData, setGeoData] = useState(null)
  const [useMyLocation, setUseMyLocation] = useState(true)

  useEffect(() => {
    if (navigator.geolocation && useMyLocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        const loadData = async () => {
          const res = await getByCoordinates(lat, lon)
          console.log(res)
          setGeoData(res.results)
        }
        loadData()
      })
    }
  }, [lat, lon, useMyLocation])

  const center = {
    lat: lat,
    lng: lon
  }
  const dCent = {
    lat: 46,
    lng: 74
  }
  const zoom = 14
  const key = process.env.REACT_APP_GOOGLE_KEY


  return (
    <div style={{ height: '75vh', width: '75%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={dCent}
        defaultZoom={zoom}
        center={center}>
        <HomeMarker
          lat={lat}
          lng={lon}
          name='Me' />
        {
          geoData ? geoData.map(place =>

            <MapMarker key={place.place_id}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
              name={place.name}
              color='white'
            />
          )
            :
            null}
      </GoogleMapReact>

    </div >
  )
}
export default GeoDisplay