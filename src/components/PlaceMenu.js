import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { FormControl, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox } from '@material-ui/core'


const PlaceMenu = ({ items }) => {
  const beverages = items.filter(i => i.type === 'beverage')
  const pizza = items.filter(i => i.type === 'pizza')

  const [variant, setVariant] = useState(null)
  const [regularToppings, setRegularToppings] = useState([])

  const handleVariantChange = (e) => {
    setVariant(e.target.value)
  }

  const addTopping = (e) => {
    let toppings = regularToppings
    if (toppings.includes(e.target.value)) {
      toppings = toppings.filter(t => t !== e.target.value)
      setRegularToppings(toppings)
    } else {
      toppings.push(e.target.value)
      setRegularToppings(toppings)
    }

    console.log(regularToppings)
  }


  console.log(variant)

  return (
    <Container>
      <h1>Menu</h1>

      <h4>Pizza</h4>
      <FormControl component="fieldset">
        <FormLabel component="legend">Style</FormLabel>
        <RadioGroup aria-label="style" name="Style" value={variant} onChange={handleVariantChange}>
          {pizza.map(p => p.variants.map(v =>
            <FormControlLabel key={v} value={v} control={<Radio />} label={v} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormGroup row>
        {pizza.map(p => p.regular_toppings.map(t =>
          <FormControlLabel key={t} control={<Checkbox value={t} onChange={(e) => addTopping(e)} />} label={t} />
        ))}
      </FormGroup>
    </Container>
  )
}
export default PlaceMenu