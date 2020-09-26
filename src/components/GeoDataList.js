import React from 'react'

const GeoDataList = ({ geoData }) => {
  return (
    <React.Fragment>
      <h3>Near me:</h3>
      {geoData ? geoData.map(place =>
        <p key={place.place_id}>
          <a href={place.place_id}>{place.name}</a>
        </p>
      )
        : null
      }
    </React.Fragment>
  )
}
export default GeoDataList