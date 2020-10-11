import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, Typography, TextField, Button } from '@material-ui/core'

const getTotalPrice = (itemArray1, itemArray2) => {
  let pizzaTotal = itemArray1.reduce((a, b) => a + b.totalPrice, 0)
  let beveragesTotal = itemArray2.reduce((a, b) => a + b.totalPrice, 0)
  return pizzaTotal + beveragesTotal
}
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

const CartBilling = ({ pizza, bevs }) => {

  const user = useSelector(state => state.activeUser.user)
  const promos = useSelector(state => state.placesReducer.promos)
  const [codeEntered, setCodeEntered] = useState('')
  const [totalPrice, setTotalPrice] = useState(getTotalPrice(pizza, bevs))
  const [notifyPromo, setNotifyPromo] = useState('')

  const checkPromo = (codeEntered) => {
    //check to see if code entered matches promos codes
    //returns array of boolean values: true=match, false=no match
    let matched = promos.map(p => p.code === codeEntered ? p : false)

    //check if boolean array includes a true value, if so, filter array to contain only the object with a matched code, else return 'invalid' notification
    //if match, store the object in a local variable
    let promoToApply
    let filterFalsy = matched.filter(Boolean)
    if (filterFalsy) {
      promoToApply = filterFalsy[0]
    } else {
      return setNotifyPromo('Invalid code')
    }

    //if valid code, check to make sure cart items qualify for entered promotion
    //if true, calculate new total accordingly, if false send 'order not qualified' notification
    if (checkQualify(user, promoToApply.code, pizza, bevs, totalPrice)) {
      if (promoToApply['multiplier']) {
        setTotalPrice(prevTotalPrice => (prevTotalPrice * promoToApply.multiplier).toFixed(2))
      }
      if (promoToApply['credit']) {
        setTotalPrice(prevTotalPrice => (prevTotalPrice - promoToApply.credit).toFixed(2))
      }
      setNotifyPromo('Success')
    } else {
      setNotifyPromo('Your order does not qualify for the promotion you entered')
    }
  }

  const handleChange = (e) => {
    setCodeEntered(e.target.value)
  }

  return (
    <div style={{ height: '100%' }}>
      <h5 className='sticky-head'>Billing</h5>
      <Card style={{ height: 178, textAlign: 'center' }}>
        <CardContent style={{ padding: 10 }}>
          <Typography variant='h5'>
            Total Due: ${totalPrice}
          </Typography>
        </CardContent>
        <div>
          <form>
            <TextField
              id="outlined-helperText"
              label="Enter Promo Code"
              helperText="*case-sensitive"
              variant="outlined"
              size='small'
              value={codeEntered}
              onChange={(e) => handleChange(e)}
            />
            <Button onClick={() => checkPromo(codeEntered)}>
              Apply
          </Button>
          </form>
        </div>
        <Typography variant='h6'>
          {notifyPromo}
        </Typography>
      </Card>
    </div>
  )
}
export default CartBilling