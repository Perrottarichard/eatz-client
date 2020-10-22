import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CircularProgress, Container } from '@material-ui/core'
import { FormGroup, FormControlLabel, Checkbox, Grid, CardActions, Typography, CardContent, Card, Button } from '@material-ui/core'
import { addBeverage } from '../reducers/activeUserReducer'

const Beverage = ({ beverages, user, place, setOpen, sendToCart }) => {
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(false)
  const choicesInitial = [beverages[0].choices.map(b => [b, false])]
  const choicesObj = Object.fromEntries(choicesInitial[0])


  //initialize local state with key/value pairs for both regular and premium toppings corresponding to checkbox checked-state. Initially false.
  const [choicesChecked, setChoicesChecked] = useState(choicesObj)

  //initialize empty arrays to store final topping choices before pushing to cart. Keep separate for billing purposes
  const selectedBeverages = []

  //make iterable arrays from objects
  let bevArr = Object.entries(choicesChecked)

  //iterate each nested array to determine true(checked) or false(unchecked). If checked, push to selectedToppings array.  Do the same for both regular and premium toppings.
  for (let i = 0; i < bevArr.length; i++) {
    if (bevArr[i].includes(true)) {
      selectedBeverages.push(bevArr[i][0])
    }
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleChoicesChecked = (event) => {
    setChoicesChecked({ ...choicesChecked, [event.target.name]: event.target.checked })
  }
  const clearSelection = () => {
    setChoicesChecked(choicesObj)
  }

  const handleAddBeverage = (item_id, type, selectedBeverages, restaurantName, restaurantId) => {
    setWaiting(true)
    setTimeout(() => {
      setWaiting(false)
    }, 3000);

    const totalPrice = ((selectedBeverages.length * 1.75) * (1.07)).toFixed(2)

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
      handleClose()
      clearSelection()
    } catch (error) {
      console.log(error)
      handleClose()
    }
  }
  const selectedBevGrammar = () => {
    if (selectedBeverages.length === 1) {
      return `a ${selectedBeverages[0]} to your cart?`
    } else if (selectedBeverages.length === 2) {
      return `a ${selectedBeverages[0]} and a ${selectedBeverages[1]} to your cart?`
    } else if (selectedBeverages.length === 3) {
      return `a ${selectedBeverages[0]}, a ${selectedBeverages[1]}, and a ${selectedBeverages[2]} to your cart?`
    } else {
      return `a ${selectedBeverages[0]}, a ${selectedBeverages[1]}, a ${selectedBeverages[2]} and a ${selectedBeverages[3]} to your cart?`
    }
  }

  return (
    <Container className='pizzaMenuContainer'>
      <br />
      <Typography variant='h5'><strong>{`Beverages`}</strong></Typography>
      <Typography variant='caption'>{`($${beverages[0].beverage_base_prices} each)`}</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormGroup row>
            {beverages[0].choices.map(b =>
              <FormControlLabel key={b} control={<Checkbox style={{ color: 'black' }} checked={choicesChecked[b]} name={b} onChange={handleChoicesChecked} />} label={b} />
            )}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Container style={{ paddingTop: 30, paddingBottom: 30, textAlign: 'center' }}>
            <Typography variant='body1' style={{ backgroundColor: '#ff2f0a', color: 'white', paddingTop: 5, borderTopLeftRadius: 3, borderTopRightRadius: 3 }}>Confirm your selection</Typography>
            <Card style={{ color: 'black', border: 'solid', borderColor: '#ff2f0a', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <CardContent>
                {!waiting ?
                  <Typography variant='body1'>
                    {selectedBeverages.length > 0 ?
                      `Add ${selectedBevGrammar()}`
                      : `No drink selected`}
                  </Typography>
                  : <CircularProgress />}
              </CardContent>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardActions style={{ textAlign: 'center' }}>
                  {selectedBeverages.length > 0 ?
                    <Button onClick={() => handleAddBeverage(beverages[0]._id, beverages[0].type, selectedBeverages, place.name, place.place_id)} variant='contained' style={{ backgroundColor: '#ff2f0a', color: 'white' }} disabled={waiting}>Add</Button>
                    : null}
                </CardActions>
              </div>
            </Card>
          </Container>
        </Grid>
      </Grid>

      {/* <div style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {selectedBeverages.length > 0 ?
                `Add ${selectedBevGrammar()}`
                : `Continue without adding a drink?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => sendToCart()} color="primary">
              No
          </Button>
            <Button onClick={selectedBeverages.length > 0 ? () => handleAddBeverage(beverages[0]._id, beverages[0].type, selectedBeverages, place.name, place.place_id,) : () => sendToCart()} color="primary" autoFocus>
              Yes
          </Button>
          </DialogActions>
        </Dialog>
      </div> */}
    </Container>
  )
}
export default Beverage