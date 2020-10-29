
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import { addOrder, resetCart } from '../reducers/activeUserReducer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Typography, TextField, InputAdornment } from '@material-ui/core'
import CartEmpty from './CartEmpty';
import { AddBox } from '@material-ui/icons';


const CartRestaurant = ({ place, setTotalPrice, setCodeEntered }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.activeUser.user)
  const [cardTip, setCardTip] = useState(0)

  let addresses
  if (user.addresses.length > 0) {
    addresses = user.addresses
  } else {
    addresses = []
  }

  let paymentInfoArray
  if (user.paymentInfoArray.length > 0) {
    paymentInfoArray = user.paymentInfoArray
  } else {
    paymentInfoArray = []
  }

  const [modalOrderOpen, setModalOrderOpen] = useState(false)
  const [deliverTo, setDeliverTo] = useState(addresses.length > 0 ? addresses[0].locationName : [])
  const [paymentChoice, setPaymentChoice] = useState('cash')

  const handleModalOrderOpen = () => {
    setModalOrderOpen(true)
  }

  const handleModalOrderClose = () => {
    setModalOrderOpen(false)
  }

  const handleDeliverToChange = (e) => {
    setDeliverTo(e.target.value)
  }
  const handlePaymentChange = (e) => {
    setPaymentChoice(e.target.value)
  }

  const handleBackToPlaceClick = (place_id) => {
    history.push(`/dashboard/restaurant/${place_id}`)
  }
  const clearCart = () => {
    dispatch(resetCart(user._id))
    setCodeEntered('')
    setTotalPrice(0)
  }
  const submitOrder = () => {
    dispatch(addOrder(user._id, cardTip, paymentChoice))
    handleModalOrderClose()
    setCodeEntered('')
    setTotalPrice(0)
    history.push('/dashboard/orders')
  }
  const handleTipChange = (e) => {
    setCardTip(e.target.value)
  }

  return (
    <div className='sticky-head'>
      <Typography variant='body1' style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}><strong></strong></Typography>
      <div className='placeDetailsDiv'>
        {place !== undefined ?
          <Card className='placeDetailsCard'>
            <CardContent style={{ margin: 'auto' }}>
              {!user.activeCartBilling ?
                <div>
                  <Button onClick={() => handleBackToPlaceClick(place._id)} style={{ textTransform: 'none', backgroundColor: '#575551', color: 'white', height: 60, marginTop: 16, fontWeight: 'bold' }} fullWidth>{`Add more items from ${place.name}`}</Button>
                  <hr />
                  <Button onClick={handleModalOrderOpen} style={{ textTransform: 'none', backgroundColor: '#ff430a', color: 'white', height: 60, fontWeight: 'bold' }} fullWidth>{`Place Order`}</Button>
                </div>
                :
                <div>
                  <Button onClick={() => clearCart()} style={{ textTransform: 'none', backgroundColor: '#575551', color: 'white', height: 60, marginTop: 16, fontWeight: 'bold' }} fullWidth>Reset Cart</Button>
                  <hr />
                  <Button onClick={handleModalOrderOpen} style={{ textTransform: 'none', backgroundColor: '#ff430a', color: 'white', height: 60, fontWeight: 'bold' }} fullWidth>{`Place Order`}</Button>
                </div>}
            </CardContent>
          </Card>
          : <CartEmpty />}
      </div>
      <Dialog open={modalOrderOpen} onClose={handleModalOrderClose} aria-labelledby="form-dialog-title">
        {/* <DialogTitle id="form-dialog-title">Deliver to:</DialogTitle> */}
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel style={{ color: '#575551' }} component="legend">Deliver To:</FormLabel>
            <RadioGroup aria-label="addresses" name="addresses" value={deliverTo} onChange={handleDeliverToChange}>
              {addresses.length > 0 ? addresses.map(p =>
                <FormControlLabel key={p.locationName} value={p.locationName} control={<Radio required={true} style={{ color: '#575551' }} />} label={p.locationName} />
              )
                : 'Add an address then come back'}
            </RadioGroup>

            <div id='spacer' style={{ height: 20, width: '100%' }}></div>

            <RadioGroup aria-label="payment" name="payment" value={paymentChoice} onChange={handlePaymentChange}>
              <FormLabel style={{ color: '#575551' }} component="legend">Payment Method:</FormLabel>
              <FormControlLabel key={'cash'} value={'cash'} control={<Radio required={true} style={{ color: '#575551' }} />} label={'Cash on Delivery'} />
              {paymentInfoArray.length > 0 ? paymentInfoArray.map(p =>
                <FormControlLabel key={p._id} value={p._id} control={<Radio required={true} style={{ color: '#575551' }} />} label={`${p.creditCardType.toUpperCase()} #: ${p.creditCardNumber} Cardholder: ${p.creditCardNameOnCard}`} />
              )
                : <Link style={{ color: '#575551', textDecoration: 'none', fontSize: 12 }} to='/dashboard/account'><AddBox style={{ fontSize: 20, marginRight: 10, color: '#ff2f0a' }} />Add a credit/debit card</Link>}
            </RadioGroup>

            <div id='spacer' style={{ height: 20, width: '100%' }}></div>

            {paymentChoice !== 'cash' &&
              <TextField style={{ backgroundColor: 'white', marginBottom: 8 }} type='number' variant='outlined' label="Add a tip for the driver?" size='small' value={cardTip} onChange={handleTipChange} InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }} />
            }
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalOrderClose} color="default">
            Cancel
          </Button>
          <Button onClick={submitOrder} variant='contained' style={{ backgroundColor: '#ff2f0a', color: 'white' }} disabled={addresses.length === 0}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CartRestaurant