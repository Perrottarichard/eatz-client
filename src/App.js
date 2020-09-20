import React, { useState, useEffect } from 'react';
import GeoDisplay from './components/GeoDisplay';
import SearchDisplay from './components/SearchDisplay';
import { getByCoordinates, getSearchPredictions, getTextSearch } from './services/dataService'

function App() {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [geoData, setGeoData] = useState(null)
  const [autoSearch, setAutoSearch] = useState('')
  const [autoSearchPredictions, setAutoSearchPredictions] = useState([])
  const [useMyLocation, setUseMyLocation] = useState(false)
  const [textSearchQuery, setTextSearchQuery] = useState('')
  const [useTextSearch, setUseTextSearch] = useState(false)
  const [textSearchResults, setTextSearchResults] = useState([])

  console.log("asp", autoSearchPredictions)
  console.log('tsr', textSearchResults)


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

  useEffect(() => {
    if (autoSearch !== '') {
      const loadSearchPredictions = async () => {
        const res = await getSearchPredictions(autoSearch)
        console.log(res)
        setAutoSearchPredictions(res.results)
      }
      loadSearchPredictions()
    }
  }, [autoSearch])

  useEffect(() => {
    if (useTextSearch) {
      const loadGetTextSearch = async () => {
        const res = await getTextSearch(textSearchQuery)
        console.log(res)
        setTextSearchResults(res.results)
        setUseTextSearch(false)
      }
      loadGetTextSearch()
    }
  }, [textSearchQuery, useTextSearch])

  const handlePredictionSearchChange = (event) => {
    setAutoSearch(event.target.value)
  }
  const handleTextSearchChange = (event) => {
    setTextSearchQuery(event.target.value)
  }
  const handleTextSearchSubmit = (event) => {
    event.preventDefault()
    setUseTextSearch(true)
  }

  return (
    <div className="App">
      <form>
        Search with real-time predictions:
        <input disabled={true} type='text' onChange={handlePredictionSearchChange} value={autoSearch}>
        </input>
      </form><br />
      <form onSubmit={handleTextSearchSubmit}>
        Search:
        <input type='text' onChange={handleTextSearchChange} value={textSearchQuery}>
        </input>
        <button type='submit'>
          Submit
        </button>
      </form>
      <GeoDisplay geoData={geoData} />
      <SearchDisplay textSearchResults={textSearchResults} />
    </div>
  );
}

export default App;
