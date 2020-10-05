import React from 'react'


const NameAddress = ({ place }) => {

  return (
    <div>
      {place !== undefined ?
        <div>
          <h3>{place.name}</h3>
          <p>{place.formatted_address}</p>
          {/* <div style={{ width: 250, height: 250 }}>
            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&maxheight=250&photoreference=${photo}&key=${process.env.REACT_APP_GOOGLE_KEY}`} alt='restaurant' />
          </div> */}
        </div>
        : <h3>Loading...</h3>}

    </div>
  )
}

export default NameAddress