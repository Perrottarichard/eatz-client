import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Grow, Container } from '@material-ui/core'
import { CardActions, Typography, CardContent, Card, Button } from '@material-ui/core'
import { addBeverage } from '../reducers/activeUserReducer'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

const Beverage = ({ beverages, user, place, sendToCart }) => {
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(false)
  const scrollRef = useRef(null);

  const handleAddBeverage = (item_id, type, selectedBeverages, restaurantName, restaurantId) => {
    setWaiting(true)
    const totalPrice = ((1.75) * (1.07)).toFixed(2)

    const beverageToAdd = {
      selectedBeverages: selectedBeverages,
      totalPrice: totalPrice,
      item_id: item_id,
      itemType: type,
      restaurantName: restaurantName,
      restaurantId: restaurantId
    }
    try {
      dispatch(addBeverage(user._id, beverageToAdd))
      setWaiting(false)
    } catch (error) {
      console.log(error)
      setWaiting(false)
    }
  }

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className='sticky-head'>
      <Container className='bevMenuContainer'>
        <br />
        <div style={{ marginBottom: 10 }}>
          <Typography variant='h5' style={{ color: 'black' }}><strong>{`Beverages`}</strong></Typography>
        </div>
        <div className='outerDashDiv'>
          <Button className='btn' onClick={() => scroll(-400)}>
            <ChevronLeft style={{ fontSize: 50 }} />
          </Button>
          <div className='dashDiv' ref={scrollRef} >
            {beverages ? beverages[0].choices.map(p =>
              <Grow key={p} in={beverages !== undefined}>
                <Card style={{ height: 130 }} elevation={3}>
                  <CardContent>
                    <Typography variant='h6'>
                      <strong>{p}</strong>
                    </Typography>
                    <Typography variant='caption' style={{ color: 'black' }}>{`$${beverages[0].beverage_base_prices}`}</Typography>
                    <br />
                  </CardContent>
                  <CardActions style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto', paddingBottom: 10 }}>
                    <Button style={{ paddingTop: 10, color: 'white', backgroundColor: '#ff2f0a' }} onClick={() => handleAddBeverage(beverages[0]._id, beverages[0].type, p, place.name, place.place_id)}>
                      <strong>Add</strong>
                    </Button>
                  </CardActions>
                </Card>
              </Grow>
            )
              :
              null
            }
          </div>
          <Button className='btn' onClick={() => scroll(400)}>
            <ChevronRight style={{ fontSize: 50 }} />
          </Button>
        </div>
      </Container>
      <div style={{ backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button style={{ flexBasis: '100%', margin: 20, color: 'white', backgroundColor: '#ff2f0a', fontWeight: 'bold' }} fullWidth onClick={() => sendToCart()} disabled={waiting}>Checkout</Button>
      </div>
    </div>
  )
}
export default Beverage