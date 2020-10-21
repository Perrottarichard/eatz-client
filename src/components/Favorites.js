import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { removeFavorite } from '../reducers/activeUserReducer'
import { useHistory } from 'react-router'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { calcDistance } from './GeoDataList'
import Chip from '@material-ui/core/Chip';
import { CheckCircleOutline, ChevronLeft, ChevronRight, FavoriteRounded, RemoveCircleOutline } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating'

const Favorites = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.activeUser.user)
  const geoData = useSelector(state => state.placesReducer.nearbyPlaces ? state.placesReducer.nearbyPlaces.filter(p => user.favoriteRestaurants.includes(p.place_id)) : null)

  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const history = useHistory()
  const isMountedRef = useRef(null)
  const scrollRef = useRef(null);

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
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 26, marginTop: 20 }}><strong>Favorites</strong></Typography>
      <div className='outerDashDiv'>
        <Button className='btn' onClick={() => scroll(-400)}>
          <ChevronLeft style={{ fontSize: 30 }} />
        </Button>
        <div className='dashDiv' ref={scrollRef} >
          {geoData && geoData.length > 0 ? geoData.map(place =>
            <Card key={place.place_id} >
              <CardHeader titleTypographyProps={{ variant: 'h4' }} title={place.name} subheader={calcDistance(lat, place.geometry.location.lat, lon, place.geometry.location.lng).toFixed(2) + ' km'} />
              <CardActions>
                <IconButton className='iconBtn' aria-label="add to favorites" onClick={() => removeFromFavorites(place.place_id)}>
                  <FavoriteRounded />
                </IconButton>
                {place.opening_hours.open_now
                  ?
                  <Chip style={{ fontSize: 10 }} size='small' label="Open" icon={<CheckCircleOutline style={{ color: 'green' }} />} />
                  :
                  <Chip style={{ fontSize: 10 }} size='small' label="Closed" icon={<RemoveCircleOutline style={{ color: 'red', fontSize: 18 }} />} />}
                <Rating style={{ marginBottom: 10 }} name="read-only" value={place.rating} readOnly size='small' precision={0.5} />
                <Button className='detailsBtn' fullWidth size='small' onClick={() => handleClick(place.place_id)}>Order
            </Button>
              </CardActions>
            </Card>
          )
            : <div style={{ display: 'inline-flex', height: '90%', width: '100%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='caption' style={{ color: 'white' }}>
                Click the heart to add or remove favorites
          </Typography>
            </div>
          }
        </div>
        <Button className='btn' onClick={() => scroll(400)}>
          <ChevronRight style={{ fontSize: 30 }} />
        </Button>
      </div>

    </div >
  )
}
export default Favorites