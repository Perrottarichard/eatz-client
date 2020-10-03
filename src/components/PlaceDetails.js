import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPlaceDetails } from '../reducers/placesReducer'

const PlaceDetails = () => {
  let place_id = useParams()
  const dispatch = useDispatch()
  const place = useSelector(state => state.placesReducer.placeDetails)
  let photo
  if (place) {
    photo = place.photos[0].photo_reference
  }

  useEffect(() => {
    if (!place || place.place_id !== place_id.id)
      dispatch(getPlaceDetails(place_id))
  }, [dispatch, place, place_id])

  return (
    <div>
      {place !== undefined ?
        <div>
          <h3>{place.name}</h3>
          <p>{place.formatted_address}</p>
          <p>{place.formatted_phone_number}</p>
          <ul>Hours:</ul>
          {place.opening_hours.weekday_text.map(d => <li key={d}>{d}</li>)}
          {/* <div style={{ width: 250, height: 250 }}>
            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&maxheight=250&photoreference=${photo}&key=${process.env.REACT_APP_GOOGLE_KEY}`} alt='restaurant' />
          </div> */}
        </div>
        : <h3>Loading...</h3>}

    </div>
  )
}

export default PlaceDetails