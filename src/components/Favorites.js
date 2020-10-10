import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { removeFavorite } from '../reducers/activeUserReducer'
import { useHistory } from 'react-router'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { calcDistance } from './GeoDataList'

const Favorites = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.activeUser.user)
  const geoData = useSelector(state => state.placesReducer.nearbyPlaces ? state.placesReducer.nearbyPlaces.filter(p => user.favoriteRestaurants.includes(p.place_id)) : null)

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

  const removeFromFavorites = (place_id) => {
    try {
      dispatch(removeFavorite(place_id, user._id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (place_id) => {
    history.push(`/dashboard/restaurant/${place_id}`)
  }

  return (
    <div className='dashDiv'>
      <h5 className='sticky-head'>My Favorites</h5>
      {geoData ? geoData.map(place =>
        <div key={place.place_id} style={{ marginTop: 10 }}>
          <Card>
            <CardHeader title={place.name} subheader={calcDistance(lat, place.geometry.location.lat, lon, place.geometry.location.lng).toFixed(2) + ' km'} />
            <CardActions>
              <Button onClick={() => handleClick(place.place_id)} disabled={place.opening_hours.open_now === true ? false : true}>{place.opening_hours.open_now === true ? 'Show Details' : 'Closed'}
              </Button>
              <IconButton aria-label="add to favorites" onClick={() => removeFromFavorites(place.place_id)}>
                <ClearIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )
        : <div style={{ height: '100%', width: '100%', margin: 'auto', textAlign: 'center' }}>
          You don't have any favorites :(
        </div>
      }
    </div>
  )
}
export default Favorites