import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

const MainCart = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const menu = clsx(classes.paper, classes.menu)
  const user = useSelector(state => state.activeUser.user)
  const dispatch = useDispatch()
  const place = useSelector(state => state.placesReducer.placeDetails)

  // useEffect(() => {
  //   if (!place || place.place_id !== place_id.id)
  //     dispatch(getPlaceDetails(place_id))
  // }, [dispatch, place, place_id])
  const cart = user.cart
  console.log(cart)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            Cart will go here
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>

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
export default MainCart