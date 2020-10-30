import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import { requestAddRestaurant } from '../reducers/placesReducer'

const RequestPartnerForm = () => {
  const [name, setName] = useState('')
  const homeGPS = useSelector(state => state.placesReducer.homeGPS)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const sendRestContact = async (event) => {
    event.preventDefault()
    try {
      dispatch(requestAddRestaurant(name, homeGPS.lat, homeGPS.lon))
    } catch (error) {
      console.log(error)
    }
    setName('')
    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  return (
    <div style={{ textAlign: 'right', marginRight: 20 }}>
      <Button onClick={handleClickOpen} style={{ textTransform: 'none', color: 'gray', fontSize: 10, padding: 0 }}>
        Don't see your favorite restaurant?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send us their information, and we'll reach out to them with our partnership opportunity!</DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <TextField style={{ backgroundColor: 'white', marginBottom: 8 }} variant='outlined' label="Restaurant Name" size='small' value={name} onChange={handleNameChange} /><br />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={sendRestContact} variant='contained' style={{ backgroundColor: '#ff2f0a', color: 'white' }}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
export default RequestPartnerForm

