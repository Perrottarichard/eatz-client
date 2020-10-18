import React from 'react'
import EmptyCart from '../assets/empty-cart.png'

const CartEmpty = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <img style={{ width: 250, height: 150 }} alt='empty cart' src={EmptyCart}></img>
  </div>
)

export default CartEmpty
