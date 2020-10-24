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
import { CheckCircleOutline, ChevronLeft, ChevronRight, Favorite, FavoriteRounded, RemoveCircleOutline } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating'
import Skeleton from '@material-ui/lab/Skeleton'
import Grow from '@material-ui/core/Grow';

const Favorites = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.activeUser.user)
  const geoData = useSelector(state => state.placesReducer.nearbyPlaces && user.favoriteRestaurants ? state.placesReducer.nearbyPlaces.filter(p => user.favoriteRestaurants.includes(p.place_id)) : null)

  const [waiting, setWaiting] = useState(false)
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

  useEffect(() => {
    if (!geoData) {
      setWaiting(true)
    } else {
      setWaiting(false)
    }
  }, [setWaiting, geoData])

  const removeFromFavorites = (place_id) => {
    setWaiting(true)
    try {
      dispatch(removeFavorite(place_id, user._id))
      setWaiting(false)
    } catch (error) {
      console.log(error)
      setWaiting(false)
    }
  }

  const handleClick = (place_id) => {
    history.push(`/dashboard/restaurant/${place_id}`)
  }
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  if (waiting) {
    return (
      <div className='sticky-head'>
        <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}><strong>Favorites</strong></Typography>
        <div className='outerDashDiv'>
          <Button className='btn' onClick={() => scroll(-400)}>
            <ChevronLeft style={{ fontSize: 50 }} />
          </Button>
          <div className='dashDiv' ref={scrollRef} >
            <Card>
              <Skeleton variant="rect" width={200} height={200} style={{ backgroundColor: '#262424' }} />
            </Card>
            <Card>
              <Skeleton variant="rect" width={200} height={200} style={{ backgroundColor: '#262424' }} />
            </Card>
          </div>
          <Button className='btn' onClick={() => scroll(400)}>
            <ChevronRight style={{ fontSize: 50 }} />
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}><strong>Favorites</strong></Typography>
      <div className='outerDashDiv'>
        <Button className='btn' onClick={() => scroll(-400)}>
          <ChevronLeft style={{ fontSize: 50 }} />
        </Button>
        <div className='dashDiv' ref={scrollRef} >
          {geoData && geoData.length > 0 ? geoData.map(place =>
            <Grow key={place.place_id} in={!waiting}>
              <Card >
                <CardHeader titleTypographyProps={{ variant: 'h4' }} title={place.name} subheader={calcDistance(lat, place.geometry.location.lat, lon, place.geometry.location.lng).toFixed(2) + ' km'} />
                <CardActions>
                  <IconButton className='iconBtn' aria-label="add to favorites" onClick={() => removeFromFavorites(place.place_id)}>
                    <FavoriteRounded />
                  </IconButton>
                  {place.opening_hours.open_now
                    ?
                    <Chip style={{ fontSize: 10 }} size='small' variant='outlined' label="Open" icon={<CheckCircleOutline style={{ color: 'green' }} />} />
                    :
                    <Chip style={{ fontSize: 10 }} size='small' variant='outlined' label="Closed" icon={<RemoveCircleOutline style={{ color: 'red', fontSize: 18 }} />} />}
                  {place.price_level ?
                    <Typography variant='body1' style={{ marginBottom: 8, fontFamily: 'monospace' }} >
                      {`$`.repeat(place.price_level)}
                    </Typography>
                    :
                    <Typography variant='body1' style={{ marginBottom: 8, fontFamily: 'monospace' }} >
                      {`$$`}
                    </Typography>
                  }
                  <Rating style={{ marginBottom: 10 }} name="read-only" value={place.rating} readOnly size='small' precision={0.5} />
                  <Button className='detailsBtn' fullWidth size='small' onClick={() => handleClick(place.place_id)}>Order
            </Button>
                </CardActions>
              </Card>
            </Grow>
          )
            : <div style={{ display: 'inline-flex', height: '90%', width: '100%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='caption' style={{ color: 'white' }}>
                Click the  <Favorite style={{ fontSize: 14 }} />  to add or remove favorites
          </Typography>
            </div>
          }
        </div>
        <Button className='btn' onClick={() => scroll(400)}>
          <ChevronRight style={{ fontSize: 50 }} />
        </Button>
      </div>
    </div >
  )
}
export default Favorites