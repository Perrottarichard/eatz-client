import React, { useState, useEffect } from 'react'
import { getByCoordinates } from './services/dataService'

const GeoDisplay = () => {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [geoData, setGeoData] = useState(null)
  const [useMyLocation, setUseMyLocation] = useState(false)

  useEffect(() => {
    if (navigator.geolocation && useMyLocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        const loadData = async () => {
          const res = await getByCoordinates(lat, lon)
          console.log(res)
          setGeoData(res.results)
        }
        loadData()
      })
    }
  }, [lat, lon, useMyLocation])

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