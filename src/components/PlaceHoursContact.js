import { Container } from '@material-ui/core'
import React from 'react'


const PlaceHoursContact = ({ place }) => {

  return (
    <div>
      <h5 className='sticky-head'>Hours and Contact</h5>
      {place !== undefined ?
        <Container>
          <p>{place.formatted_phone_number}</p>
          <ul>Hours:</ul>
          {place.opening_hours.weekday_text.map(d => <li key={d}>{d}</li>)}
        </Container>
        : <h3>Loading...</h3>}

    </div>
  )
}

export default PlaceHoursContact


