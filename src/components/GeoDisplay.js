import React from 'react'

const GeoDisplay = ({ geoData }) => {
  console.log(geoData)
  return (
    <div>
      {geoData ?
        <div>
          <p>
            City: {geoData.location.city_name}<br />
            Country: {geoData.location.country_name}<br />
          </p>
          {geoData.popularity.top_cuisines ?
            <ul>Top Cuisines: {geoData.popularity.top_cuisines.map(c => <li key={c}>{c}</li>)}
            </ul>
            : null
          }
        </div>
        : null
      }
    </div>
  )
}
export default GeoDisplay