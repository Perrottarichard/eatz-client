import React, { useState, useEffect } from 'react'
import { getTextSearch } from './services/dataService'

const SearchDisplay = () => {
  const [textSearchQuery, setTextSearchQuery] = useState('')
  const [useTextSearch, setUseTextSearch] = useState(false)
  const [textSearchResults, setTextSearchResults] = useState([])

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

  const handleTextSearchChange = (event) => {
    setTextSearchQuery(event.target.value)
  }
  const handleTextSearchSubmit = (event) => {
    event.preventDefault()
    setUseTextSearch(true)
  }


  return (
    <div>
      <form onSubmit={handleTextSearchSubmit}>
        Search:
        <input type='text' onChange={handleTextSearchChange} value={textSearchQuery}>
        </input>
        <button type='submit'>
          Submit
        </button>
      </form>
      {textSearchResults ? textSearchResults.map(d =>
        <div key={d.place_id}>
          <p>
            Name: {d.name}<br />
          </p>
          <p>
            Location: {d.formatted_address}
          </p>
        </div>
      )
        : null
      }
    </div>
  )
}
export default SearchDisplay