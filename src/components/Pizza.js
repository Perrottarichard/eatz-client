import React, { useState } from 'react'
import { Container, Button } from '@material-ui/core'
import { FormControl, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, Grid, Fab } from '@material-ui/core'
import { AddShoppingCart, RemoveCircleOutline } from '@material-ui/icons'




const Pizza = ({ pizza }) => {

  const [size, setSize] = useState(null)
  const [variant, setVariant] = useState(null)

  //dynamically intialize an object from the array of topping choices to use for the checkbox with key/value pairs set initially to false. When checked, corresponding key item's value will change to true
  const regInitial = [pizza.map(p => p.regular_toppings.map(x => [x, false]))]
  const regObj = Object.fromEntries(regInitial[0][0])

  const premInitial = [pizza.map(p => p.premium_toppings.map(x => [x, false]))]
  const premObj = Object.fromEntries(premInitial[0][0])

  //initialize local state with key/value pairs for both regular and premium toppings corresponding to checkbox checked-state. Initially false.
  const [regularChecked, setRegularChecked] = useState(regObj)
  const [premiumChecked, setPremiumChecked] = useState(premObj)

  //initialize empty arrays to store final topping choices before pushing to cart. Keep separate for billing purposes
  let selectedRegularToppings = []
  let selectedPremiumToppings = []

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
  //Can't use. possibly a bug in Mui. Resetting Mui checkbox values programmatically isn't reflected in the UI.
  // const clearSelection = () => {
  //   setRegularChecked(regObj)
  //   setPremiumChecked(premObj)
  //   setSize(null)
  //   setVariant(null)

  // }

  return (
    <Container>
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
          <FormLabel component='legend'>Choose some toppings:</FormLabel><br />
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
        <Grid item xs={12} sm={12} md={12} lg={6}>
        </Grid>
      </Grid>
      {variant && size ?
        <div style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>
          <Fab id='pizza-button' aria-label="add">
            <AddShoppingCart />
          </Fab>
          {/* <Fab onClick={clearSelection} color="secondary" aria-label="clear">
            <RemoveCircleOutline />
          </Fab> */}
        </div>
        : null}
    </Container>
  )
}
export default Pizza