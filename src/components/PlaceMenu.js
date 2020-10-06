import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { FormControl, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox } from '@material-ui/core'


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
      <h1>Menu</h1>

      <h2>Pizza</h2>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Choose a size:</FormLabel>
        <RadioGroup aria-label="style" name="Style" value={size} onChange={handleSizeChange}>
          {pizza.map(p => p.pizza_base_prices.map(x =>
            <FormControlLabel key={x.size} value={x.size} control={<Radio />} label={`${x.size}: $${x.price}`} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Choose a style:</FormLabel>
        <RadioGroup aria-label="style" name="Style" value={variant} onChange={handleVariantChange}>
          {pizza.map(p => p.variants.map(v =>
            <FormControlLabel key={v} value={v} control={<Radio />} label={v !== 'regular' ? `${v} (add 20%)` : v} />
          ))
          }
        </RadioGroup>
      </FormControl>
      <h3>Regular Toppings ($2 each)</h3>
      <FormGroup row>
        {pizza.map(p => p.regular_toppings.map(t =>
          <FormControlLabel key={t} control={<Checkbox value={t} onChange={(e) => addRegTopping(e)} />} label={t} />
        ))}
      </FormGroup>
      <h3>Premium Toppings ($4 each)</h3>
      <FormGroup row>
        {pizza.map(p => p.premium_toppings.map(t =>
          <FormControlLabel key={t} control={<Checkbox value={t} onChange={(e) => addPremTopping(e)} />} label={t} />
        ))}
      </FormGroup>
    </Container>
  )
}
export default PlaceMenu