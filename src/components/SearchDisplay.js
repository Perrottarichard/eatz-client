import React from 'react'

const SearchDisplay = ({ textSearchResults }) => {
  return (
    <div>
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