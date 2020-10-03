import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPlaceDetails, getPlaceDetailsPhoto } from '../reducers/placesReducer'

const PlaceDetails = () => {
  let place_id = useParams()
  const dispatch = useDispatch()
  const place = useSelector(state => state.placesReducer.placeDetails)
  const photo = place.photos[0].photo_reference
  const pic = useSelector(state => state.placesReducer.placeDetailsPhoto)

  useEffect(() => {
    if (!place || place.place_id !== place_id.id)
      dispatch(getPlaceDetails(place_id))
  }, [])

  // useEffect(() => {
  //   if (place)
  //     dispatch(getPlaceDetailsPhoto(photo))
  // }, [place, dispatch, photo])



  return (
    <div>
      <h3>{place.name}</h3>
      <img src={`data:image/jpeg;base64,${pic}`} alt='restaurant' />
    </div>
  )
}

export default PlaceDetails