import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { FormControl, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, Grid } from '@material-ui/core'

const Beverage = ({ beverages }) => {

  const [choices, setChoices] = useState([])
  console.log(beverages)
  const addBeverage = (e) => {
    let drinks = choices
    if (drinks.includes(e.target.value)) {
      let removed = drinks.filter(t => t !== e.target.value)
      setChoices(removed)
      console.log(choices)
    } else {
      drinks.push(e.target.value)
      setChoices(drinks)
      console.log(choices)
    }
  }
  return (
    <Container>
      <h2>{`Beverages ($${beverages[0].beverage_base_prices} each)`}</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormGroup row>
            {beverages.map(b => b.choices.map(c =>
              <FormControlLabel key={c} control={<Checkbox value={c} onChange={(e) => addBeverage(e)} />} label={c} />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Beverage