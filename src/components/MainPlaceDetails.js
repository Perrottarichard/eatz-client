import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPlaceDetails } from '../reducers/placesReducer'
import { initMenu } from '../reducers/placesReducer'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PlaceNameAddress from './PlaceNameAddress';
import PlaceHoursContact from './PlaceHoursContact';
import PlaceReviews from './PlaceReviews';
import PlaceMenu from './PlaceMenu'
import { LinearProgress } from '@material-ui/core'

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

  const items = useSelector(state => state.placesReducer.menu ? state.placesReducer.menu : undefined)

  useEffect(() => {
    if (!items) {
      dispatch(initMenu())
    }
  }, [dispatch, items])

  if (!place) {
    return <LinearProgress color="secondary" />
  }

  if (!items) {
    return <LinearProgress color="secondary" />
  }
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <PlaceNameAddress place={place} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <PlaceHoursContact place={place} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <PlaceReviews place={place} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className={menu}>
            <PlaceMenu items={items} place={place} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )

}
export default MainPlaceDetails