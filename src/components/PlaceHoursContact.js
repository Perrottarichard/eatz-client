import React from 'react'


const HoursContact = ({ place }) => {

  return (
    <div>
      <h5 className='sticky-head'>Hours and Contact</h5>
      {place !== undefined ?
        <div>
          <p>{place.formatted_phone_number}</p>
          <ul>Hours:</ul>
          {place.opening_hours.weekday_text.map(d => <li key={d}>{d}</li>)}
        </div>
        : <h3>Loading...</h3>}

    </div>
  )
}

export default HoursContact


