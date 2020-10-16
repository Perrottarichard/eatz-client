import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import { LocalDrink, LocalPizzaOutlined } from '@material-ui/icons'

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
    height: 'auto',
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
    return 'Completed'
  } else {
    return 'In progress'
  }
}
export const formatPrice = (number) => {
  let split = number.toString().split(/\./)
  if (split[split.length - 1].length === 1) {
    split[split.length - 1] = split[split.length - 1] + '0'
  }
  return split.join('.')
}


const MainOrderHistory = () => {

  const classes = useStyles();
  const itemsContainer = clsx(classes.paper, classes.itemsContainer)
  const user = useSelector(state => state.activeUser.user)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className={itemsContainer}>
            <Grid container spacing={1}>
              {user.orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(o =>
                <Grid key={o._id} item xs={12} sm={6} md={3} lg={3}>
                  <Card className={classes.cardStyle}>
                    <CardHeader className={classes.cardHeader} titleTypographyProps={{ variant: 'subtitle1' }} title={`${o.cart[0].restaurantName}`} subheader={getProgress(o.date) === 'Completed' ? new Date(o.date).toString().slice(0, 25) : 'progress bar here'} />
                    <CardContent style={{ listStyleType: 'none', paddingTop: 0, height: 180, overflow: 'auto' }}>
                      <hr />
                      <Typography variant='subtitle2' style={{ height: 20 }}>
                        <div style={{ float: 'left' }}>
                          {`Status: ${getProgress(o.date)}`}
                        </div>
                        <div style={{ float: 'right' }}>
                          {`OrderID: ${o.confirmation}`}
                        </div>
                      </Typography>
                      <hr />
                      {o.cart.map(c =>
                        <div key={c._id} style={{ margin: 5, paddingBottom: 5, paddingTop: 0, textAlign: 'center' }}>
                          <Typography variant='body2' style={{ display: 'inline-flex', lineHeight: 1.75 }}>
                            {c.selectedVariant ? <LocalPizzaOutlined /> : null}
                            {c.selectedVariant ? <em>{c.selectedVariant}</em> : null}
                          </Typography>
                          <div style={{ display: 'block', textAlign: 'center' }}>
                            <Typography variant='caption'>
                              <small> {c.selectedRegularToppings.map(t => <span key={t}> {t} </span>)}
                                {c.selectedPremiumToppings.map(t => <span key={t}> {t} </span>)}</small>
                            </Typography>
                          </div>
                          {c.itemType === 'beverages' ? c.selectedBeverages.map(b => <div><Typography key={b} variant='body2' style={{ display: 'inline-flex', lineHeight: 1.75 }}>
                            {<LocalDrink />}
                            {<em> {b}</em>}
                          </Typography></div>)
                            : null}
                        </div>
                      )}
                    </CardContent>
                    <div style={{ textAlign: 'center', height: '50px', lineHeight: 4 }}>
                      {o.activeCartBilling ? `$${formatPrice(o.activeCartBilling.afterPromoPrice)}` : `$${formatPrice(o.cart.reduce((a, b) => a + b.totalPrice, 0))}`}
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