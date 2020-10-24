import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { setPlaces, setHomeGPS } from '../reducers/placesReducer'
import { addFavorite } from '../reducers/activeUserReducer'
import { getByCoordinates } from '../services/dataService'
import { useHistory } from 'react-router'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import Grow from '@material-ui/core/Grow';
import { CheckCircleOutline, ChevronLeft, ChevronRight, RemoveCircleOutline } from '@material-ui/icons';

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
  const homeGPS = useSelector(state => state.placesReducer.homeGPS)
  const [waiting, setWaiting] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const isMountedRef = useRef(null)
  const scrollRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true
    if (navigator.geolocation && (!homeGPS || (!homeGPS.lat || !homeGPS.lon))) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('georunning')
        if (isMountedRef.current) {
          dispatch(setHomeGPS(position.coords.latitude, position.coords.longitude))
        }
      })
    }
    return () => isMountedRef.current = false
  }, [dispatch, homeGPS])

  useEffect(() => {
    isMountedRef.current = true
    const loadData = async () => {
      if (homeGPS && isMountedRef.current) {
        const res = await getByCoordinates(homeGPS.lat, homeGPS.lon)
        if (isMountedRef.current)
          dispatch(setPlaces(res.results))
      }
    }
    loadData()
    return () => isMountedRef.current = false
  }, [dispatch, homeGPS])

  const addToFavorites = (place_id) => {
    setWaiting(true)
    try {
      dispatch(addFavorite(place_id, user._id))
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
  }

  //handle loading state with Skeleton
  if (!geoData || !homeGPS || waiting) {
    return (
      <div className='sticky-head'>
        <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}><strong>Near Me</strong></Typography>
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
            <Card>
              <Skeleton variant="rect" width={200} height={200} style={{ backgroundColor: '#262424' }} />
            </Card>
            <Card>
              <Skeleton variant="rect" width={200} height={200} style={{ backgroundColor: '#262424' }} />
            </Card>
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
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}><strong>Near Me</strong></Typography>
      <div className='outerDashDiv'>
        <Button className='btn' onClick={() => scroll(-400)}>
          <ChevronLeft style={{ fontSize: 50 }} />
        </Button>
        <div className='dashDiv' ref={scrollRef} >
          {geoData && homeGPS ? geoData.map(place =>
            <Grow key={place.place_id} in={geoData !== undefined}>
              <Card key={place.place_id}>
                <CardHeader titleTypographyProps={{ variant: 'h4' }} title={place.name} subheader={calcDistance(homeGPS.lat, place.geometry.location.lat, homeGPS.lon, place.geometry.location.lng).toFixed(2) + ' km'} />
                <CardActions>
                  <IconButton className='iconBtn' aria-label="add to favorites" onClick={() => addToFavorites(place.place_id)}>
                    <FavoriteIcon />
                  </IconButton>
                  {place && place.opening_hours && place.opening_hours.open_now
                    ?
                    <Chip style={{ fontSize: 10 }} size='small' variant='outlined' label="Open" icon={<CheckCircleOutline style={{ color: 'green' }} />} />
                    :
                    <Chip style={{ fontSize: 10 }} variant='outlined' label="Closed" size='small' icon={<RemoveCircleOutline style={{ color: 'red', fontSize: 18 }} />} />}
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
            :
            null
          }
        </div>
        <Button className='btn' onClick={() => scroll(400)}>
          <ChevronRight style={{ fontSize: 50 }} />
        </Button>
      </div>
    </div>
  )
}
export default GeoDataList