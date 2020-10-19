import React from 'react'
import { Typography } from '@material-ui/core'

const CartEmpty = () => (
  <div style={{ display: 'inline-flex', height: '90%', width: '100%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
    <Typography variant='h6' color='textSecondary'>
      Such emptiness...
  </Typography>
  </div>
)

export default CartEmpty
