import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { FormControl, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, Grid } from '@material-ui/core'


const PlaceMenu = ({ items }) => {
  const beverages = items.filter(i => i.type === 'beverage')
  const pizza = items.filter(i => i.type === 'pizza')

  const [size, setSize] = useState(null)
  const [variant, setVariant] = useState(null)
  const [regularToppings, setRegularToppings] = useState([])
  const [premiumToppings, setPremiumToppings] = useState([])

  const handleVariantChange = (e) => {
    setVariant(e.target.value)
  }
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }

  const addRegTopping = (e) => {
    let toppings = regularToppings
    if (toppings.includes(e.target.value)) {
      let removed = toppings.filter(t => t !== e.target.value)
      setRegularToppings(removed)
      console.log(regularToppings)
    } else {
      toppings.push(e.target.value)
      setRegularToppings(toppings)
      console.log(regularToppings)
    }
  }
  const addPremTopping = (e) => {
    let toppings = premiumToppings
    if (toppings.includes(e.target.value)) {
      let removed = toppings.filter(t => t !== e.target.value)
      setPremiumToppings(removed)
      console.log(premiumToppings)
    } else {
      toppings.push(e.target.value)
      setPremiumToppings(toppings)
      console.log(premiumToppings)
    }
  }
  return (
    <Container>
      <h2>Pizza</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Step 1: Choose a size:</FormLabel>
            <RadioGroup aria-label="style" name="Style" value={size} onChange={handleSizeChange}>
              {pizza.map(p => p.pizza_base_prices.map(x =>
                <FormControlLabel key={x.size} value={x.size} control={<Radio />} label={`${x.size}: $${x.price}`} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Step 2: Choose a style:</FormLabel>
            <RadioGroup aria-label="style" name="Style" value={variant} onChange={handleVariantChange}>
              {pizza.map(p => p.variants.map(v =>
                <FormControlLabel key={v} value={v} control={<Radio />} label={v !== 'regular' ? `${v} (add 20%)` : v} />
              ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <FormLabel component='legend'>Step 3: Choose some toppings:</FormLabel><br />
          <FormLabel component='legend'>Regular toppings ($2 each)</FormLabel>
          <FormGroup row>
            {pizza.map(p => p.regular_toppings.map(t =>
              <FormControlLabel key={t} control={<Checkbox value={t} onChange={(e) => addRegTopping(e)} />} label={t} />
            ))}
          </FormGroup>
          <br />
          <FormLabel component='legend'>Premium toppings ($4 each)</FormLabel>
          <FormGroup row>
            {pizza.map(p => p.premium_toppings.map(t =>
              <FormControlLabel key={t} control={<Checkbox value={t} onChange={(e) => addPremTopping(e)} />} label={t} />
            ))}
          </FormGroup>
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>

        </Grid>
      </Grid>
    </Container>
  )
}
export default PlaceMenu