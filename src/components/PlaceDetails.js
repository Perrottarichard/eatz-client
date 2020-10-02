import React from 'react'
import { useParams } from 'react-router'

const PlaceDetails = () => {

  const place = useParams()
  console.log(place)

  return (
    <div>
      place details will go here
    </div>
  )
}

export default PlaceDetails