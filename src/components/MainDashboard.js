import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { geoActive } from '../reducers/placesReducer'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GeoDataList from './GeoDataList';
import GeoDisplay from './GeoDisplay';
import Favorites from './Favorites';
import UserAddressesModal from './UserAddressesModal';
import RequestPartnerForm from './RequestPartnerForm';



const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: 'black'
  },
  mapGrid: {
    display: 'flex',
    justifyContent: 'center'
  }

}))

const MainDashboard = () => {
  const classes = useStyles();
  const user = useSelector(state => state.activeUser.user)
  const dispatch = useDispatch()
  const isMountedRef = useRef(null)
  const [openOnClick, setOpenOnClick] = useState(false)
  const scrollRef = useRef(null);
  const [showFormLink, setShowFormLink] = useState(false)

  useEffect(() => {
    isMountedRef.current = true
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      dispatch(geoActive(true))
    }, (error) => {
      console.log(error)
      dispatch(geoActive(false))
      window.alert('We can`t get your location. Please make sure location services are allowed in your browser, then reload the page')
    })
    return () => isMountedRef.current = false
  }, [dispatch])

  setInterval(() => {
    if (scrollRef.current && scrollRef.current.scrollLeft > 800) {
      setShowFormLink(true)
    }
  }, 5000);

  return (
    <React.Fragment>
      <Grid container direction='row' justify='space-evenly' spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <GeoDataList scrollRef={scrollRef} />
          {showFormLink ?
            <RequestPartnerForm />
            : <div id='RequestPartnerFormSpacer' style={{ height: 20 }}></div>}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Favorites />
        </Grid>
        <Grid className={classes.mapGrid} item xs={12} sm={12} md={12} lg={12}>
          <GeoDisplay />
        </Grid>
      </Grid>
      <UserAddressesModal user={user} titleMessage={`Tell us where to deliver your pizza, and we'll save your information so you only have to do this once.`} openOnClick={openOnClick} setOpenOnClick={setOpenOnClick} />
    </React.Fragment>

  )
}
export default MainDashboard