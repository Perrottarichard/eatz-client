import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { geoActive } from '../reducers/placesReducer'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GeoDataList from './GeoDataList';
import GeoDisplay from './GeoDisplay';
import Favorites from './Favorites';
// import Promos from './Promos';
import UserAddressesModal from './UserAddressesModal';



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

  useEffect(() => {
    isMountedRef.current = true
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(geoActive(true))
    }, (error) => {
      console.log(error)
      dispatch(geoActive(false))
    })
    return () => isMountedRef.current = false
  }, [dispatch])


  return (
    <React.Fragment>
      <Grid container direction='row' justify='space-evenly' spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <GeoDataList />
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