import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPlaceDetails } from '../reducers/placesReducer'
import { initMenu } from '../reducers/placesReducer'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PlaceNameAddress from './PlaceNameAddress';
import Promos from './Promos'
import PlaceReviews from './PlaceReviews';
import PlaceMenu from './PlaceMenu'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import PlaceInfoSkeleton from './PlaceInfoSkeleton'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingLeft: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
  menu: {
    height: 'auto',
  },
  appBar: {
    color: 'white',
    backgroundColor: 'black'
  },
  indicator: {
    backgroundColor: '#ff2f0a'
  }
}))

const MainPlaceDetails = () => {

  const classes = useStyles();
  const user = useSelector(state => state.activeUser.user)
  let place_id = useParams()
  const dispatch = useDispatch()
  const place = useSelector(state => state.placesReducer.placeDetails)
  const items = useSelector(state => state.placesReducer.menu ? state.placesReducer.menu : undefined)

  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!place || place.place_id !== place_id.id)
      dispatch(getPlaceDetails(place_id))
  }, [dispatch, place, place_id])


  useEffect(() => {
    if (!items) {
      dispatch(initMenu())
    }
  }, [dispatch, items])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Grid container direction='row' justify='space-evenly' spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {!place || !items ?
            <PlaceInfoSkeleton />
            :
            <div>
              <PlaceNameAddress place={place} />
            </div>
          }
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {!place || !items ?
            null
            :
            <div>
              <AppBar position="relative" className={classes.appBar}>
                <Tabs value={value} onChange={handleChange} centered classes={{ indicator: classes.indicator }}>
                  <Tab label="Menu" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
                  <Tab label="Promotions" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
                  <Tab label="Reviews" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                {user.cart.length === 0 || user.cart[0].restaurantId === place.place_id ?
                  <PlaceMenu items={items} place={place} />
                  :
                  <div style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto', width: 300, marginTop: 30 }}>
                    <Typography variant='h5' style={{ flexBasis: '100%', textAlign: 'center', color: '#ff2f0a' }}>Oops...</Typography>
                    <Typography variant='body1' style={{ textAlign: 'center', color: 'gray' }}>
                      You already have items from <em style={{ color: 'white' }}>{user.cart[0].restaurantName}</em> in your cart.  Please complete your order from that restaurant first, or remove those items from your cart.
                    </Typography>
                  </div>}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Promos />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PlaceReviews place={place} />
              </TabPanel>
            </div>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  )

}
export default MainPlaceDetails