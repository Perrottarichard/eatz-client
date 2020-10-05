import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { setPlaces } from '../reducers/placesReducer'
import { addFavorite } from '../reducers/activeUserReducer'
import { getByCoordinates } from '../services/dataService'
import { useHistory } from 'react-router'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import IconButton from '@material-ui/core/IconButton';

export const calcDistance = (lat1, lat2, lng1, lng2) => {
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

const GeoDataList = () => {
  const user = useSelector(state => state.activeUser.user)
  const geoData = useSelector(state => state.placesReducer.nearbyPlaces ? state.placesReducer.nearbyPlaces.filter(p => !user.favoriteRestaurants.includes(p.place_id)) : null)

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

  const addToFavorites = (place_id) => {
    try {
      dispatch(addFavorite(place_id, user._id))
    } catch (error) {
      console.log(error)
    }
  }
  const handleClick = (place_id) => {
    history.push(`/dashboard/${place_id}`)
  }

  return (
    <div className='dashDiv'>
      <h5 className='sticky-head'>Near Me
      {/* <Button style={{ float: 'right', height: 'auto', textTransform: 'none', lineHeight: 0.5, color: 'white' }}>next page</Button> */}
      </h5>
      {geoData ? geoData.map(place =>
        <div key={place.place_id} style={{ marginTop: 10 }}>
          <Card>
            <CardHeader title={place.name} subheader={calcDistance(lat, place.geometry.location.lat, lon, place.geometry.location.lng).toFixed(2) + ' km'} />
            <CardActions>
              <Button onClick={() => handleClick(place.place_id)} disabled={place.opening_hours.open_now === true ? false : true}>{place.opening_hours.open_now === true ? 'Show Details' : 'Closed'}
              </Button>
              <IconButton aria-label="add to favorites" onClick={() => addToFavorites(place.place_id)}>
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )
        : <div style={{ height: '100%', width: '100%', margin: 'auto', textAlign: 'center' }}>
          <Button style={{ width: '100%', height: '100%', margin: 'auto' }} onClick={() => setShowList(true)}>Show me nearby restaurants</Button>
        </div>
      }
    </div>
  )
}
export default GeoDataList