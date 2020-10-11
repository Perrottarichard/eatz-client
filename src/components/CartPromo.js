import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, CardContent, TextField } from '@material-ui/core'

const CartPromo = () => {

  const promos = useSelector(state => state.placesReducer.promos)
  console.log(promos)
  const [codeEntered, setCodeEntered] = useState('')

  const handleChange = (e) => {
    setCodeEntered(e.target.value)
  }
  const checkPromo = (code) => {
    let matched = promos.map(p => p.code === code ? p : false)
    let filterFalsy = matched.filter(Boolean)
    console.log(filterFalsy)
    // if (match) {
    //   return match
    // } else {
    //   return 'Invalid Code'
    // }
  }
  return (
    <div style={{ height: '100%' }}>
      <Card style={{ height: '100%', textAlign: 'center' }}>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  )
}
export default CartPromo