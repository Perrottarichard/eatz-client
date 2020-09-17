import React, { useState, useEffect } from 'react';
import GeoDisplay from './components/GeoDisplay';
import { getByCoordinates } from './services/dataService'

function App() {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [geoData, setGeoData] = useState(null)
  console.log('lat', lat)
  console.log('lon', lon)

  useEffect(() => {
    if (navigator.geolocation) {
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
  }, [lat, lon])

  // const handleChangeLat = (event) => {
  //   setLat(event.target.value)
  // }
  // const handleChangeLon = (event) => {
  //   setLon(event.target.value)
  // }


  return (
    <div className="App">
      <GeoDisplay geoData={geoData} />
    </div>
  );
}

export default App;
