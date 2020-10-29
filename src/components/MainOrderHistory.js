import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Grow } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    display: 'block',
    height: 'auto',
    width: '90%',
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
  const endMilli = startMilli + (60000 * 30)
  const currentMilli = Date.now()
  if (currentMilli > endMilli) {
    return 'Completed'
  } else {
    let minutesLeft = (Math.floor((endMilli - currentMilli) / 60000))
    let minutesElapsed = (30 - minutesLeft)
    let percentageComplete = Math.round((minutesElapsed / 30) * 100)
    return percentageComplete
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
  const user = useSelector(state => state.activeUser.user)
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);

  const progMessage = (prog) => {
    if (prog < 20) {
      return 'Preparing your order'
    } else if (prog < 60) {
      return 'It\'s a\'cookin!'
    } else if (prog < 70) {
      return 'Adding the finishing touches'
    } else if (prog < 87) {
      return 'Our driver picked up your order'
    } else if (prog < 99) {
      return 'Your order will be arriving any minute now'
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
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
          <Grid container spacing={2}>
            {user.orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(o =>
              <Grow key={o._id} in={true}>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Card className={classes.cardStyle}>
                    <CardHeader className={classes.cardHeader} titleTypographyProps={{ variant: 'subtitle1' }} title={`${o.cart[0].restaurantName}`} subheader={getProgress(o.date) === 'Completed' ? new Date(o.date).toString().slice(0, 25) : <LinearProgress variant="determinate" value={getProgress(o.date)} />} />
                    <CardContent style={{ listStyleType: 'none', paddingTop: 0, height: 180, overflow: 'auto' }}>
                      <Typography variant='caption'>
                        {getProgress(o.date) !== 'Completed' ? <em>{progMessage(getProgress(o.date))}</em> : null}
                        {getProgress(o.date) !== 'Completed' ? <hr /> : null}
                      </Typography>
                      <Typography variant='subtitle2' style={{ height: 20 }}>
                        <div style={{ float: 'left' }}>
                          {`${getProgress(o.date) === 'Completed' ? 'Delivered' : getProgress(o.date) + '%'}`}
                        </div>
                        <div style={{ float: 'right' }}>
                          {`ID: ${o.confirmation}`}
                        </div>
                      </Typography>
                      <hr />
                      {o.cart.map(c =>
                        <div key={c._id} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                          <li style={{ fontStyle: 'italic' }}>
                            {c.selectedVariant ? c.selectedVariant + ' pizza ' : null}
                          </li>
                          <div style={{ display: 'block' }}>
                            <Typography variant='caption'>
                              <small> {c.selectedRegularToppings.map(t => <span key={t}>&nbsp;{t}&nbsp;</span>)}
                                {c.selectedPremiumToppings.map(t => <span key={t}> &nbsp;{t} &nbsp;</span>)}</small>
                            </Typography>
                          </div>
                          {c.itemType === 'beverages' ? c.selectedBeverages.map(b => <li key={b} style={{ display: 'inline-flex' }}>
                            {b} &nbsp;
                          </li>)
                            : null}
                        </div>
                      )}
                    </CardContent>
                    <div style={{ textAlign: 'center', height: '50px', lineHeight: 4, backgroundColor: '#ff2f0a', color: 'white' }}>
                      {o.activeCartBilling ? `Total: $${formatPrice(o.activeCartBilling.afterPromoPrice + o.creditCardTip)} ${o.creditCardTip > 0 ? <small>(inc. tax and tip)</small> : <small>(inc. tax)</small>}` : `Total: $${formatPrice(o.cart.reduce((a, b) => a + b.totalPrice, o.creditCardTip))} (inc. tax and tip)`}
                    </div>
                  </Card>
                </Grid>
              </Grow>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment >
  )

}
export default MainOrderHistory