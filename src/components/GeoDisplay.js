import React, { useState, useEffect } from 'react'
import { getByCoordinates } from '../services/dataService'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import HomeMarker from './HomeMarker'
import LoadingMap from './LoadingMap'
import GeoDataList from './GeoDataList'
import { useDispatch } from 'react-redux'
import { setPlaces } from '../reducers/placesReducer'
import { Button } from '@material-ui/core'
import stockMap from '../assets/stockmap.jpg'

const GeoDisplay = () => {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [useMyLocation, setUseMyLocation] = useState(true)
  const [geoData, setGeoData] = useState(undefined)
  const [showMap, setShowMap] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (navigator.geolocation && useMyLocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        const loadData = async () => {
          if (showMap) {
            const res = await getByCoordinates(lat, lon)
            console.log(res)
            dispatch(setPlaces(res.results))
            setGeoData(res.results)
          }
        }
        loadData()
      })
    }
  }, [dispatch, lat, lon, useMyLocation, showMap])

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
          <Button style={{ width: '100%', height: '100%', margin: 'auto' }} onClick={() => setShowMap(true)}>Show me restaurants nearby</Button>
        </div>}
    </div >
  )
}
export default GeoDisplay