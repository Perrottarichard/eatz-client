import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, CardActions } from '@material-ui/core'
import { FormControl, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, Grid, Card, CardContent, Typography } from '@material-ui/core'
import { addCart } from '../reducers/activeUserReducer'
import CircularProgress from '@material-ui/core/CircularProgress';

const calcPizzaPrice = (pizza, size, variant, selectedRegularToppings, selectedPremiumToppings) => {
  let sizePrice = 0
  let variantPrice = 0
  let regToppingsPrice = 0
  let premToppingsPrice = 0

  for (let i = 0; i < pizza[0].pizza_base_prices.length; i++) {
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

  let totalPrice = ((variantPrice + regToppingsPrice + premToppingsPrice) * 1.07).toFixed(2)
  return totalPrice
}


const Pizza = ({ pizza, place, user }) => {

  const dispatch = useDispatch()
  const [size, setSize] = useState('large')
  const [variant, setVariant] = useState('regular')
  const [waiting, setWaiting] = useState(false)

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

  const clearSelection = () => {
    setRegularChecked(regObj)
    setPremiumChecked(premObj)
    setSize('large')
    setVariant('regular')
  }

  const handleAddPizza = (itemId, type, size, variant, restaurantName, restaurantId, selectedRegularToppings, selectedPremiumToppings) => {

    setWaiting(true)
    setTimeout(() => {
      setWaiting(false)
    }, 3000);
    const totalPrice = calcPizzaPrice(pizza, size, variant, selectedRegularToppings, selectedPremiumToppings)

    const itemToAdd = {
      itemId: itemId,
      itemType: type,
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
      clearSelection()
    } catch (error) {
      console.log(error)
      setWaiting(false)
    }
  }
  const selectedToppingsGrammar = () => {
    let toppingCount = selectedRegularToppings.length + selectedPremiumToppings.length
    switch (toppingCount) {
      case 0:
        return `no toppings`
      case 1:
        return `1 topping`
      default:
        return `${toppingCount} toppings`
    }
  }

  return (
    <Container className='pizzaMenuContainer'>
      <br />
      <Typography variant='h5'><strong>Pizza</strong></Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Choose a size:</FormLabel>
            <RadioGroup aria-label="style" name="Style" value={size} onChange={handleSizeChange}>
              {pizza.map(p => p.pizza_base_prices.map(x =>
                <FormControlLabel key={x.size} value={x.size} control={<Radio style={{ color: 'black' }} />} label={`${x.size}: $${x.price}`} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose a style:</FormLabel>
            <RadioGroup aria-label="style" name="Style" value={variant} onChange={handleVariantChange}>
              {pizza.map(p => p.variants.map(v =>
                <FormControlLabel key={v} value={v} control={<Radio style={{ color: 'black' }} />} label={v !== 'regular' ? `${v} (add 20%)` : v} />
              ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormLabel component='legend'>Choose some toppings:</FormLabel><br />
          <FormLabel component='legend'>Regular ($2 each)</FormLabel>
          <FormGroup row>
            {pizza.map(p => p.regular_toppings.map(t =>
              <FormControlLabel key={t} control={<Checkbox style={{ color: 'black' }} checked={regularChecked[t]} name={t} onChange={handleRegularChecked} />} label={t} />
            ))}
          </FormGroup>
          <br />
          <FormLabel component='legend'>Premium ($4 each)</FormLabel>
          <FormGroup row>
            {pizza.map(p => p.premium_toppings.map(t =>
              <FormControlLabel key={t} control={<Checkbox style={{ color: 'black' }} checked={premiumChecked[t]} name={t} onChange={handlePremiumChecked} />} label={t} />
            ))}
          </FormGroup>
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Container style={{ paddingTop: 30, paddingBottom: 30, textAlign: 'center' }}>
            <Typography variant='body1' style={{ backgroundColor: '#ff2f0a', color: 'white', paddingTop: 5, borderTopLeftRadius: 3, borderTopRightRadius: 3 }}>Confirm your selection</Typography>
            <Card style={{ color: 'black', border: 'solid', borderColor: '#ff2f0a', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <CardContent>
                {waiting ? <CircularProgress color='secondary' /> :
                  <Typography variant='body1'>
                    {`Add a ${size} ${variant} pizza with ${selectedToppingsGrammar()} to your cart?`}
                  </Typography>
                }
              </CardContent>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardActions style={{ textAlign: 'center' }}>
                  <Button onClick={() => handleAddPizza(pizza.id, pizza[0].type, size, variant, place.name, place.place_id, selectedRegularToppings, selectedPremiumToppings)} variant='contained' style={{ backgroundColor: '#ff2f0a', color: 'white' }} disabled={waiting}>Add</Button>
                </CardActions>
              </div>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Pizza