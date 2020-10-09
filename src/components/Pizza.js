import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button } from '@material-ui/core'
import { FormControl, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, Grid, Fab } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { addCart } from '../reducers/activeUserReducer'
import { AddShoppingCart, RemoveCircleOutline } from '@material-ui/icons'


const calcPizzaPrice = (pizza, size, variant, selectedRegularToppings, selectedPremiumToppings) => {
  let sizePrice = 0
  let variantPrice = 0
  let regToppingsPrice = 0
  let premToppingsPrice = 0

  for (let i = 0; i < pizza[0].pizza_base_prices.length; i++) {
    console.log(size)
    if (size === pizza[0].pizza_base_prices[i].size) {
      sizePrice = pizza[0].pizza_base_prices[i].price
    }
  }
  for (let i = 0; i < pizza[0].add_ons.length; i++) {
    if (variant === pizza[0].add_ons[i].variant) {
      variantPrice = pizza[0].add_ons[i].multiplier * sizePrice
    }
  }
  if (selectedRegularToppings) {
    regToppingsPrice = selectedRegularToppings.length * 2
  }
  if (selectedPremiumToppings) {
    premToppingsPrice = selectedPremiumToppings.length * 4
  }
  console.log(sizePrice)
  console.log(variantPrice)
  console.log(regToppingsPrice)
  console.log(premToppingsPrice)


  let totalPrice = ((variantPrice + regToppingsPrice + premToppingsPrice) * 1.07).toFixed(2)
  return totalPrice
}


const Pizza = ({ pizza, place, user }) => {

  const dispatch = useDispatch()
  const [size, setSize] = useState(null)
  const [variant, setVariant] = useState(null)
  const [open, setOpen] = React.useState(false);

  //dynamically intialize an object from the array of topping choices to use for the checkbox with key/value pairs set initially to false. When checked, corresponding key item's value will change to true
  const regInitial = [pizza.map(p => p.regular_toppings.map(x => [x, false]))]
  const regObj = Object.fromEntries(regInitial[0][0])

  const premInitial = [pizza.map(p => p.premium_toppings.map(x => [x, false]))]
  const premObj = Object.fromEntries(premInitial[0][0])

  //initialize local state with key/value pairs for both regular and premium toppings corresponding to checkbox checked-state. Initially false.
  const [regularChecked, setRegularChecked] = useState(regObj)
  const [premiumChecked, setPremiumChecked] = useState(premObj)

  //initialize empty arrays to store final topping choices before pushing to cart. Keep separate for billing purposes
  const selectedRegularToppings = []
  const selectedPremiumToppings = []

  //make iterable arrays from objects
  let regArr = Object.entries(regularChecked)
  let premArr = Object.entries(premiumChecked)

  //iterate each nested array to determine true(checked) or false(unchecked). If checked, push to selectedToppings array.  Do the same for both regular and premium toppings.
  for (let i = 0; i < regArr.length; i++) {
    if (regArr[i].includes(true)) {
      selectedRegularToppings.push(regArr[i][0])
    }
  }
  for (let i = 0; i < premArr.length; i++) {
    if (premArr[i].includes(true)) {
      selectedPremiumToppings.push(premArr[i][0])
    }
  }
  const handleVariantChange = (e) => {
    setVariant(e.target.value)
  }
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }
  const handleRegularChecked = (event) => {
    setRegularChecked({ ...regularChecked, [event.target.name]: event.target.checked });
  }
  const handlePremiumChecked = (event) => {
    setPremiumChecked({ ...premiumChecked, [event.target.name]: event.target.checked });
  }

  //handle confirmation dialog
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  const handleAddCart = (itemId, size, variant, restaurantName, restaurantId, selectedRegularToppings, selectedPremiumToppings) => {
    console.log(variant)
    let totalPrice = calcPizzaPrice(pizza, size, variant, selectedRegularToppings, selectedPremiumToppings)
    let itemToAdd = {
      itemId: itemId,
      selectedVariant: variant,
      selectedSize: size,
      selectedRegularToppings: selectedRegularToppings,
      selectedPremiumToppings: selectedPremiumToppings,
      restaurantName: restaurantName,
      restaurantId: restaurantId,
      totalPrice: totalPrice
    }
    try {
      dispatch(addCart(user._id, itemToAdd))
      handleClose()
    } catch (error) {
      console.log(error)
      handleClose()
    }
  }

  //Can't use. possibly a bug in Mui. Resetting Mui checkbox values programmatically isn't reflected in the UI.
  // const clearSelection = () => {
  //   setRegularChecked(regObj)
  //   setPremiumChecked(premObj)
  //   setSize(null)
  //   setVariant(null)
  // }

  return (
    <Container >
      <h2>Pizza</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component='fieldset'>
            <FormLabel style={{ color: '#575551' }} component='legend'>Choose a size:</FormLabel>
            <RadioGroup aria-label="style" name="Style" value={size} onChange={handleSizeChange}>
              {pizza.map(p => p.pizza_base_prices.map(x =>
                <FormControlLabel key={x.size} value={x.size} control={<Radio style={{ color: '#575551' }} />} label={`${x.size}: $${x.price}`} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component="fieldset">
            <FormLabel style={{ color: '#575551' }} component="legend">Choose a style:</FormLabel>
            <RadioGroup aria-label="style" name="Style" value={variant} onChange={handleVariantChange}>
              {pizza.map(p => p.variants.map(v =>
                <FormControlLabel key={v} value={v} control={<Radio style={{ color: '#575551' }} />} label={v !== 'regular' ? `${v} (add 20%)` : v} />
              ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <FormLabel component='legend' style={{ color: '#575551' }}>Choose some toppings:</FormLabel><br />
          <FormLabel component='legend'>Regular ($2 each)</FormLabel>
          <FormGroup row>
            {pizza.map(p => p.regular_toppings.map(t =>
              <FormControlLabel key={t} control={<Checkbox style={{ color: '#575551' }} checked={regularChecked.t} name={t} onChange={handleRegularChecked} />} label={t} />
            ))}
          </FormGroup>
          <br />
          <FormLabel component='legend'>Premium ($4 each)</FormLabel>
          <FormGroup row>
            {pizza.map(p => p.premium_toppings.map(t =>
              <FormControlLabel key={t} control={<Checkbox style={{ color: '#575551' }} checked={premiumChecked.t} name={t} onChange={handlePremiumChecked} />} label={t} />
            ))}
          </FormGroup>
          <br />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={6}>
        </Grid> */}
      </Grid>
      {variant && size ?
        <div style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>
          <Fab onClick={handleClickOpen} id='pizza-button' aria-label="add">
            <AddShoppingCart />
          </Fab>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Add a ${size} ${variant} pizza to your cart?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                No
          </Button>
              <Button onClick={() => handleAddCart(pizza.id, size, variant, place.name, place.place_id, selectedRegularToppings, selectedPremiumToppings)} color="primary" autoFocus>
                Yes
          </Button>
            </DialogActions>
          </Dialog>
        </div>
        : null}
    </Container>
  )
}
export default Pizza