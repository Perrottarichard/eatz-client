import React, { useState, useEffect } from 'react';
import GeoDisplay from './components/GeoDisplay';
import { getData } from './services/geoCodeService'

function App() {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [geoData, setGeoData] = useState(null)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (clicked) {
      const loadData = async () => {
        const res = await getData(lat, lon)
        setGeoData(res.data)
      }
      loadData()
      setClicked(false)
    }
  }, [lat, lon, clicked])


  const loadData = (event) => {
    event.preventDefault()
    setClicked(true)
  }
  const handleChangeLat = (event) => {
    setLat(event.target.value)
  }
  const handleChangeLon = (event) => {
    setLon(event.target.value)
  }


  return (
    <div className="App">
      <div>
        <form onSubmit={(event) => loadData(event)}>
          latitude <input type='text' onChange={handleChangeLat} value={lat} /><br />
          longitude <input type='text' onChange={handleChangeLon} value={lon} /><br />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <GeoDisplay geoData={geoData} />
    </div>
  );
}

export default App;
