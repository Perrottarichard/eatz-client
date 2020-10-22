import React from 'react'
import { Typography } from '@material-ui/core'
import quotes from '../pizzaquotes.json'

const getQuote = () => {
  let random = Math.floor(Math.random() * 7)
  let quoteObj = quotes[random]
  return quoteObj
}

const quoteToShow = getQuote()

const CartEmpty = () => (
  <div style={{ display: 'inline-flex', height: '90%', width: '100%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
    <Typography variant='body1' style={{ color: 'white' }}>
      "{quoteToShow.quote}"<br />
      -{quoteToShow.author}
    </Typography>
  </div>
)

export default CartEmpty
