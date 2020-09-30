import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { requestAddRestaurant } from '../reducers/placesReducer'

const RequestPartnerForm = () => {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const dispatch = useDispatch()

  const sendRestContact = async (event) => {
    event.preventDefault()
    try {
      dispatch(requestAddRestaurant(name, city, country))
    } catch (error) {
      console.log(error)
    }
    setName('')
    setCity('')
    setCountry('')
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleCityChange = (e) => {
    setCity(e.target.value)
  }
  const handleCountryChange = (e) => {
    setCountry(e.target.value)
  }
  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      Don't see one of your favorite local pizza restaurants?
      Send us their information and we'll reach out to them with our partnership opportunity!
      <form onSubmit={sendRestContact} style={{ marginTop: 10 }}>
        <TextField style={{ backgroundColor: 'white', marginBottom: 5 }} variant='filled' id="standard-basic" label="Restaurant Name" size='small' value={name} onChange={handleNameChange} /><br />
        <TextField style={{ backgroundColor: 'white', marginBottom: 5 }} variant='filled' id="standard-basic" label="City/Town" size='small' value={city} onChange={handleCityChange} /><br />
        <TextField style={{ backgroundColor: 'white', marginBottom: 5 }} variant='filled' id="standard-basic" label="Country" size='small' value={country} onChange={handleCountryChange} /><br />
        <Button type='submit' variant='contained' style={{ height: 30 }}>Send</Button>
      </form>
    </div>

  )
}
export default RequestPartnerForm

