import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, CardContent } from '@material-ui/core'
import Pizza from './Pizza';
import Beverage from './Beverage';

const PlaceMenu = ({ items, place }) => {

  const user = useSelector(state => state.activeUser.user)
  const beverages = items.filter(i => i.type === 'beverages')
  const pizza = items.filter(i => i.type === 'pizza')
  const history = useHistory()

  const sendToCart = () => {
    history.push('/dashboard/cart')
  }

  if (!place.opening_hours.open_now) {
    return (
      <div className='placeDetailsDiv'>
        {place !== undefined ?
          <div className='placeDetailsClosed'>
            <CardContent>
              <Typography variant='body1'>Sorry, this restaurant is closed.</Typography>
              <br />
            </CardContent>
          </div>
          : <h3>Loading...</h3>}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div style={{ width: "100%", height: 20 }}></div>
      <Pizza pizza={pizza} place={place} user={user} />
      <div style={{ width: "100%", height: 40 }}></div>
      <Beverage beverages={beverages} user={user} place={place} sendToCart={sendToCart}
      />
    </React.Fragment>
  )
}
export default PlaceMenu