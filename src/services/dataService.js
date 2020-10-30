import axios from 'axios'

//development
// const baseUrl = 'http://localhost:3001/api'

//production
const baseUrl = 'https://pizzapizzadelivery.herokuapp.com/api'

export const getByCoordinates = async (lat, lon) => {
  console.log('getbycoord running')
  const response = await axios.post(`${baseUrl}/searchByCoordinates`, {
    lat: lat,
    lon: lon
  })
  return response.data
}

export const getSearchPredictions = async (search) => {
  const response = await axios.post(`${baseUrl}/autoSearchPredictions`, {
    search: search
  })
  return response.data
}

export const getTextSearch = async (search) => {
  const response = await axios.post(`${baseUrl}/textSearch`, {
    search: search
  })
  return response.data
}

export const postRequestAddRestaurant = async (name, lat, lon) => {
  const response = await axios.post(`${baseUrl}/requestNewRestaurant`, {
    name: name,
    lat: lat,
    lon: lon
  })
  return response.data

}
export const getPlaceDetailsRequest = async (place_id) => {
  const response = await axios.post(`${baseUrl}/placeDetails`, {
    place_id: place_id
  })
  return response.data
}
export const loadMenu = async () => {
  const response = await axios.get(`${baseUrl}/menuItems`)
  return response.data
}
export const loadPromos = async () => {
  const response = await axios.get(`${baseUrl}/promos`)
  return response.data
}