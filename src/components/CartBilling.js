import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const CartBilling = ({ pizza, bevs }) => {

  const getTotalPrice = (itemArray1, itemArray2) => {
    let pizzaTotal = itemArray1.reduce((a, b) => a + b.totalPrice, 0)
    let beveragesTotal = itemArray2.reduce((a, b) => a + b.totalPrice, 0)
    return pizzaTotal + beveragesTotal
  }

  return (
    <div style={{ height: '100%' }}>
      <h5 className='sticky-head'>Billing</h5>
      <Card style={{ height: '100%', textAlign: 'center' }}>
        <CardContent style={{ padding: 10 }}>
          <Typography variant='h5'>
            Total Due: ${getTotalPrice(pizza, bevs)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default CartBilling