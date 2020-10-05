import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPlaceDetails } from '../reducers/placesReducer'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NameAddress from './PlaceNameAddress';
import HoursContact from './PlaceHoursContact';
import PlaceReviews from './PlaceReviews';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
  menu: {
    minHeight: 500
  }
}))

const MainPlaceDetails = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const menu = clsx(classes.paper, classes.menu)

  let place_id = useParams()
  const dispatch = useDispatch()
  const place = useSelector(state => state.placesReducer.placeDetails)

  useEffect(() => {
    if (!place || place.place_id !== place_id.id)
      dispatch(getPlaceDetails(place_id))
  }, [dispatch, place, place_id])

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <NameAddress place={place} />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <HoursContact place={place} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <PlaceReviews place={place} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className={menu}>

          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default MainPlaceDetails