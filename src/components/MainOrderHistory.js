import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CartBilling from './CartBilling';
import CartRestaurant from './CartRestaurant';
import { removeCart } from '../reducers/activeUserReducer';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingLeft: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,

  },
  itemsContainer: {
    minHeight: 500,
    backgroundColor: '#575551'
  },
  cardStyle: {
    display: 'block',
    height: 300,
    margin: 'auto'
  },
  cardHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    textTransform: 'capitalize',
    marginTop: 10,
    height: 80
  },
  cardActions: {
    justifyContent: 'center',
    margin: 'auto',
    height: 35,
    backgroundColor: 'black',
  },
  priceText: {
    backgroundColor: '#575551',
    color: 'white'
  }
}))

const getProgress = (date) => {
  const startMilli = new Date(date).getTime()
  const endMilli = startMilli + (60000 * 25)
  const currentMilli = Date.now()
  if (currentMilli > endMilli) {
    return 'completed'
  } else {
    return 'in progress'
  }
}


const MainOrderHistory = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const itemsContainer = clsx(classes.paper, classes.itemsContainer)
  const user = useSelector(state => state.activeUser.user)
  const activeCartBillingObject = user.activeCartBilling

  let startMilli = user.orders.map(o => new Date(o.date).getTime())
  const MS_IN_MINUTE = 60000

  // let endMilli = startMilli.map(t => t + (MS_IN_MINUTE * 25))
  // user.orders.map(o => console.log(new Date(o.date)))
  // endMilli.map(x => console.log(new Date(x)))

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className={itemsContainer}>
            <Grid container spacing={1}>
              {user.orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(o =>
                <Grid key={o._id} item xs={12} sm={6} md={3} lg={3}>
                  <Card className={classes.cardStyle}>
                    <CardHeader className={classes.cardHeader} titleTypographyProps={{ variant: 'subtitle1' }} title={`${o.cart[0].restaurantName}`} subheader={`Status: ${getProgress(o.date)}`} />
                    <CardContent style={{ listStyleType: 'none', paddingTop: 0, height: 180, overflow: 'auto' }}>
                      <Typography variant='subtitle2'>
                        {getProgress(o.date) === 'completed' ? new Date(o.date).toString().slice(0, 25) : 'progress bar here'}
                      </Typography><br />
                      {o.cart.map(c =>
                        <div key={c._id}>
                          <Typography variant='body1'>
                            {c.selectedVariant ? c.selectedVariant + ' pizza' : null}
                          </Typography>
                          <Typography variant='caption' >
                            {c.selectedRegularToppings.map(t => <li key={t}>{t}</li>)}
                            {c.selectedPremiumToppings.map(t => <li key={t}>{t}</li>)}
                          </Typography>
                          <Typography variant='body1'>
                            {c.itemType === 'beverages' ? c.selectedBeverages.map(b => <li key={b}>{b}</li>)
                              : null}
                          </Typography>
                        </div>
                      )}
                    </CardContent>
                    <div style={{ textAlign: 'center', height: '50px' }}>
                      {o.activeCartBilling ? o.activeCartBilling.afterPromoPrice : o.cart.reduce((a, b) => a + b.totalPrice, 0)}
                    </div>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment >
  )

}
export default MainOrderHistory