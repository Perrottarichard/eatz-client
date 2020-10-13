
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'

const CartRestaurant = ({ place }) => {
  const history = useHistory()
  const user = useSelector(state => state.activeUser.user)

  const handleBackToPlaceClick = (place_id) => {
    history.push(`/dashboard/restaurant/${place_id}`)
  }
  console.log(place)
  return (
    <div style={{ height: '100%' }}>
      <h5 className='sticky-head'>Finished?</h5>
      {place !== undefined ?
        <Card style={{ height: 178, textAlign: 'center' }}>
          <CardContent style={{ margin: 'auto' }}>
            {!user.activeCartBilling ?
              <div>
                <Button onClick={() => handleBackToPlaceClick(place._id)} style={{ textTransform: 'none', backgroundColor: 'lightgray', height: 60 }} fullWidth>{`Order more items from ${place.name}`}</Button>
                <hr />
                <Button style={{ textTransform: 'none', backgroundColor: '#ff430a', color: 'white', height: 60 }} fullWidth>{`I'm hungry! Place my order please.`}</Button>
              </div>
              :
              <Button style={{ textTransform: 'none', backgroundColor: '#ff430a', color: 'white', height: 60 }} fullWidth>{`I'm hungry! Place my order please.`}</Button>}
          </CardContent>
        </Card>
        : <h3>Loading...</h3>}

    </div>
  )
}

export default CartRestaurant