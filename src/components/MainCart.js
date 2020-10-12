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
    height: 350,
    margin: 'auto'
  }
}))

const getTotalPrice = (itemArray1, itemArray2) => {
  let pizzaTotal = itemArray1.reduce((a, b) => a + b.totalPrice, 0)
  let beveragesTotal = itemArray2.reduce((a, b) => a + b.totalPrice, 0)
  let t = pizzaTotal + beveragesTotal
  return t
}

const MainCart = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const itemsContainer = clsx(classes.paper, classes.itemsContainer)
  const user = useSelector(state => state.activeUser.user)
  const dispatch = useDispatch()
  let cart = user.cart
  let bevs = cart.filter(c => c.itemType === 'beverages')
  let pizza = cart.filter(c => c.itemType === 'pizza')
  const [totalPrice, setTotalPrice] = useState(getTotalPrice(pizza, bevs))
  let place
  //prop passed to CartRestaurant, can change later to fetch full place details from google
  if (pizza.length > 0) {
    place = pizza[0].restaurantName
  }

  const removeFromCart = (item_id) => {
    cart = cart.filter(c => c._id !== item_id)
    bevs = cart.filter(c => c.itemType === 'beverages')
    pizza = cart.filter(c => c.itemType === 'pizza')
    setTotalPrice(getTotalPrice(pizza, bevs))
    try {
      dispatch(removeCart(user._id, item_id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <CartRestaurant place={place} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>
            <CartBilling pizza={pizza} bevs={bevs} user={user} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className={itemsContainer}>
            <Grid container spacing={1}>
              {pizza.map(c =>
                <Grid key={c._id} item xs={12} sm={6} md={3} lg={3}>
                  <Card className={classes.cardStyle}>
                    <CardHeader title={`${c.selectedVariant} ${c.itemType}`} subheader={`size: ${c.selectedSize}`} style={{ textTransform: 'capitalize' }} />
                    <CardContent style={{ listStyleType: 'none', paddingTop: 0, height: '50%' }}>
                      <Typography variant='overline'>
                        {c.selectedRegularToppings.length + c.selectedPremiumToppings.length > 0 ? 'toppings: '
                          : 'no toppings'}
                      </Typography>
                      <Typography variant='caption' >
                        {c.selectedRegularToppings.map(t => <li key={t}>{t}</li>)}
                        {c.selectedPremiumToppings.map(t => <li key={t}>{t}</li>)}
                      </Typography>
                      <br />
                    </CardContent>
                    <div style={{ display: 'block', textAlign: 'center' }}>
                      <Typography variant='subtitle2' style={{ textTransform: 'capitalize', paddingLeft: 16 }} >
                        price (inc. 7% tax): <strong>${c.totalPrice}</strong>
                      </Typography>
                      <CardActions style={{ margin: 'auto', justifyContent: 'center' }}>
                        <IconButton aria-label="remove from cart" onClick={() => removeFromCart(c._id, c.totalPrice)}>
                          <ClearIcon style={{ color: 'red' }} />
                        </IconButton>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              )}
              {bevs.map(b =>
                <Grid key={b._id} item xs={12} sm={6} md={3} lg={3}>
                  <Card className={classes.cardStyle}>
                    <CardHeader title={`${b.itemType}`} subheader='size: 20oz' style={{ textTransform: 'capitalize' }} />
                    <CardContent style={{ listStyleType: 'none', paddingTop: 0, height: '50%' }}>
                      <Typography variant='body2' >
                        {b.selectedBeverages.map(t => <li key={t}>{t}</li>)}
                      </Typography>
                    </CardContent>
                    <div style={{ display: 'block', textAlign: 'center' }}>
                      <Typography variant='subtitle2' style={{ textTransform: 'capitalize', paddingLeft: 16 }} >
                        price (inc. 7% tax): <strong>${b.totalPrice}</strong>
                      </Typography>
                      <CardActions style={{ margin: 'auto', justifyContent: 'center' }}>
                        <IconButton aria-label="remove from cart" onClick={() => removeFromCart(b._id)}>
                          <ClearIcon style={{ color: 'red' }} />
                        </IconButton>
                      </CardActions>
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
export default MainCart