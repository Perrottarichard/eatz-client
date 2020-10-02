import React, { useState, useEffect, useRef } from 'react'
import { getByCoordinates } from '../services/dataService'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import HomeMarker from './HomeMarker'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaces } from '../reducers/placesReducer'
import { Button } from '@material-ui/core'
import stockMap from '../assets/stockmap.jpg'

const GeoDisplay = () => {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const geoData = useSelector(state => state.placesReducer.nearbyPlaces)
  const [showMap, setShowMap] = useState(false)
  const dispatch = useDispatch()
  const isMountedRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true
    if (navigator.geolocation && !lat && !lon) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (isMountedRef.current) {
          setLat(position.coords.latitude)
          setLon(position.coords.longitude)
        }
      })
    }
    return () => isMountedRef.current = false
  }, [lat, lon])

  useEffect(() => {
    isMountedRef.current = true
    const loadData = async () => {
      if (showMap && isMountedRef.current) {
        const res = await getByCoordinates(lat, lon)
        if (isMountedRef.current)
          dispatch(setPlaces(res.results))
      }
    }
    loadData()
    return () => isMountedRef.current = false
  }, [dispatch, showMap, lat, lon])

  const center = {
    lat: lat,
    lng: lon
  }
  const dCent = {
    lat: 46,
    lng: 74
  }
  const zoom = 13
  const key = process.env.REACT_APP_GOOGLE_KEY


  return (
    <div style={{ height: '100%', width: '100%', margin: 'auto', textAlign: 'center' }}>
      {showMap ?
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={dCent}
          defaultZoom={zoom}
          center={center}>
          {geoData && geoData.length > 0 ?
            <HomeMarker
              lat={lat}
              lng={lon}
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
        :
        <div style={{ height: '100%', width: '100%', margin: 'auto', textAlign: 'center', backgroundImage: `url(${stockMap}` }}>
          <Button style={{ width: '100%', height: '100%', margin: 'auto' }} onClick={() => setShowMap(true)}>Show me on the map</Button>
        </div>}
    </div >
  )
}
export default GeoDisplay