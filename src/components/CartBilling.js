import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, Typography, TextField, Button } from '@material-ui/core'
import { setActiveCartBilling } from '../reducers/activeUserReducer'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab'
import { formatPrice } from './MainOrderHistory'


const checkQualify = (user, qualifyingPromo, pizzaArray, beverageArray, totalPrice) => {
  switch (qualifyingPromo) {
    case 'RIPBRASI':
      return pizzaArray.map(i => i.selectedRegularToppings.includes('anchovies') && i.selectedVariant === 'sicilian').includes(true)
    case '1STORDER':
      return user.orders.length === 0
    case '23DRINKFREE':
      return beverageArray.length > 0 && totalPrice >= 23
    default:
      break;
  }
}

const CartBilling = ({ pizza, bevs, user, totalPrice, setTotalPrice, activeCartBillingObject, codeEntered, setCodeEntered }) => {

  const dispatch = useDispatch()
  const promos = useSelector(state => state.placesReducer.promos)

  const [notifyPromo, setNotifyPromo] = useState({
    severity: '',
    message: ''
  })
  const [successAppliedPromotion, setSuccessAppliedPromotions] = useState('')

  const updateActiveCartOnEnterPromoCode = (newTotal) => {
    let diff = (totalPrice - newTotal).toFixed(2)
    dispatch(setActiveCartBilling(user._id, totalPrice, newTotal, diff, codeEntered))
  }
  const [openNotify, setOpenNotify] = React.useState(false);

  const handleClose = () => {
    setOpenNotify(false);
  }

  const checkPromo = (codeEntered) => {
    //check to see if code entered matches promos codes
    //returns array of boolean values: true=match, false=no match
    let matched = promos.map(p => p.code === codeEntered ? p : false)

    //check if boolean array includes a true value, if so, filter array to contain only the object with a matched code, else return 'invalid' notification
    //if match, store the object in a local variable
    let promoToApply
    let filterFalsy = matched.filter(Boolean)
    if (filterFalsy.length > 0) {
      promoToApply = filterFalsy[0]
    } else {
      setOpenNotify(true)
      setNotifyPromo({ severity: 'error', message: 'Invalid Code' })
      setTimeout(() => {
        setNotifyPromo('')
      }, 5000);
      return null
    }


    //if valid code, check to make sure cart items qualify for entered promotion
    //if true, calculate new total accordingly, if false send 'order not qualified' notification
    if (checkQualify(user, promoToApply.code, pizza, bevs, totalPrice)) {
      if (!successAppliedPromotion) {
        setOpenNotify(true)
        setNotifyPromo({ severity: 'success', message: 'Success!' })
        setTimeout(() => {
          setNotifyPromo('')
        }, 5000);
        setSuccessAppliedPromotions(promoToApply.discount)
        let newTotal
        if (promoToApply['multiplier']) {
          newTotal = (totalPrice * promoToApply.multiplier).toFixed(2)
          setTotalPrice(prevTotalPrice => (prevTotalPrice * promoToApply.multiplier).toFixed(2))
        }
        if (promoToApply['credit']) {
          newTotal = (totalPrice - promoToApply.credit).toFixed(2)
          setTotalPrice(prevTotalPrice => (prevTotalPrice - promoToApply.credit).toFixed(2))
        }
        updateActiveCartOnEnterPromoCode(newTotal)
      } else {
        setOpenNotify(true)
        setNotifyPromo({ severity: 'warning', message: 'You can only apply 1 promotion per order' })
        setTimeout(() => {
          setNotifyPromo('')
        }, 5000);
      }
    } else {
      setOpenNotify(true)
      setNotifyPromo({ severity: 'error', message: 'Your order does not qualify for the promotion you entered' })
      setTimeout(() => {
        setNotifyPromo('')
      }, 5000);
    }
  }

  const handleChange = (e) => {
    setCodeEntered(e.target.value)
  }



  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}><strong></strong></Typography>
      <div className='placeDetailsDiv'>
        <Card className='placeDetailsCard'>
          <CardContent style={{ padding: 10, paddingTop: 30 }}>
            <Typography variant='body1'>
              Total Due: ${activeCartBillingObject ? formatPrice(activeCartBillingObject.afterPromoPrice.toFixed(2)) : Number(formatPrice(totalPrice)).toFixed(2)}
            </Typography>
            <Typography variant='caption' style={{ listStyleType: 'none' }}>
              {activeCartBillingObject ? `original price: $${formatPrice(activeCartBillingObject.beforePromoPrice.toFixed(2))}` : `original price: $${Number(formatPrice(totalPrice)).toFixed(2)}`}
            </Typography><br />
            <Typography variant='caption' style={{ listStyleType: 'none' }}>
              {activeCartBillingObject ? `discount: $${formatPrice(activeCartBillingObject.priceDiff.toFixed(2))}` : `discount: no promotion applied`}
            </Typography>
          </CardContent>
          <div>
            <form>
              <TextField
                id="outlined-helperText"
                label="Promo Code *case-sensitive"
                variant="outlined"
                size='small'
                value={codeEntered}
                onChange={(e) => handleChange(e)}
                disabled={activeCartBillingObject ? true : false}
              />
              <Button disabled={activeCartBillingObject ? true : false} onClick={() => checkPromo(codeEntered)}>
                Apply
          </Button>
            </form>
            <Snackbar open={openNotify} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={notifyPromo.severity}>
                {notifyPromo.message}
              </Alert>
            </Snackbar>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default CartBilling