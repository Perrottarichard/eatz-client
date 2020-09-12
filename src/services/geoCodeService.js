// this code is used to send a GET request to the Zomato API endpoint that will return a list of popular cuisines and nearby restaurants around the given coordinates (lat, lon).  Ex. NYC coordinates are approx. lat = 40.7128 lon = 74.006

import axios from 'axios'

export const getData = async (lat, lon) => {
  const results = await axios.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`, {
    headers: {
      'user-key': `${process.env.REACT_APP_ZOMATO_KEY}`
    }
  })
  return results
}