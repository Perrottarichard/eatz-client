import React from 'react'

const GeoDisplay = ({ geoData }) => {
  console.log(geoData)
  return (
    <div>
      {geoData ? geoData.map(d =>
        <div key={d.name}>
          <p>
            Name: {d.name}<br />
          </p>
          <p>
            Location: {d.vicinity}
          </p>
        </div>
      )
        : null
      }
    </div>
  )
}
export default GeoDisplay