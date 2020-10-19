import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { removeFavorite } from '../reducers/activeUserReducer'
import { useHistory } from 'react-router'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { calcDistance } from './GeoDataList'
import Chip from '@material-ui/core/Chip';
import { CheckCircleOutline, RemoveCircleOutline } from '@material-ui/icons';

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
      <h5 className='sticky-head'>Favorites</h5>
      {geoData.length > 0 ? geoData.map(place =>
        <div key={place.place_id} style={{ marginTop: 10 }}>
          <Card>
            <div>
              <CardHeader title={place.name} subheader={calcDistance(lat, place.geometry.location.lat, lon, place.geometry.location.lng).toFixed(2) + ' km'} />
            </div>
            <CardActions>
              <Button variant='outlined' size='small' onClick={() => handleClick(place.place_id)}>Show Details
            </Button>
              {place.opening_hours.open_now
                ?
                <Chip style={{ fontSize: 10, marginTop: 12, float: 'left', marginLeft: 10 }} size='small' label="Open" icon={<CheckCircleOutline style={{ color: 'green' }} />} />
                :
                <Chip style={{ fontSize: 10, marginTop: 12, float: 'left', marginLeft: 10 }} size='small' label="Closed" icon={<RemoveCircleOutline style={{ color: 'red', fontSize: 18 }} />} />}
              <IconButton aria-label="add to favorites" onClick={() => removeFromFavorites(place.place_id)}>
                <ClearIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )
        : <div style={{ display: 'inline-flex', height: '90%', width: '100%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h6' color='textSecondary'>
            No Favorites Yet
          </Typography>
        </div>
      }
    </div>
  )
}
export default Favorites