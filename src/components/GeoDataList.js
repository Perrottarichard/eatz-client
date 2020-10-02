import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { setPlaces } from '../reducers/placesReducer'
import { getByCoordinates } from '../services/dataService'
import { useHistory } from 'react-router'

const GeoDataList = () => {
  const geoData = useSelector(state => state.placesReducer.nearbyPlaces)
  const [showList, setShowList] = useState(false)
  const dispatch = useDispatch()
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const history = useHistory()
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
      if (showList && isMountedRef.current) {
        const res = await getByCoordinates(lat, lon)
        if (isMountedRef.current)
          dispatch(setPlaces(res.results))
      }
    }
    loadData()
    return () => isMountedRef.current = false
  }, [dispatch, showList, lat, lon])

  const calcDistance = (lat1, lat2, lng1, lng2) => {
    const pi = Math.PI
    let radiansLat1 = lat1 * (pi / 180)
    let radiansLat2 = lat2 * (pi / 180)
    let radiansLng1 = lng1 * (pi / 180)
    let radiansLng2 = lng2 * (pi / 180)

    let dlon = radiansLng2 - radiansLng1
    let dlat = radiansLat2 - radiansLat1

    let ans = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)

    let c = 2 * Math.asin(Math.sqrt(ans))

    const radiusOfEarth = 6371

    return c * radiusOfEarth
  }
  const handleClick = (place_id) => {
    history.push(`/dashboard/${place_id}`)
  }

  return (
    <div style={{ height: '100%', width: '100%', margin: 'auto', paddingLeft: 20 }}>
      {geoData ? geoData.map(place =>
        <p key={place.place_id} >
          <button style={{ textDecoration: 'none', color: '#575551' }} onClick={() => handleClick(place.place_id)}>{place.name}</button>
          <span style={{ float: 'right', color: '#575551' }}>{calcDistance(lat, place.geometry.location.lat, lon, place.geometry.location.lng).toFixed(2) + ' km'}</span>
        </p>
      )
        : <div style={{ height: '100%', width: '100%', margin: 'auto', textAlign: 'center' }}>
          <Button style={{ width: '100%', height: '100%', margin: 'auto' }} onClick={() => setShowList(true)}>Show me nearby restaurants</Button>
        </div>
      }
    </div>
  )
}
export default GeoDataList