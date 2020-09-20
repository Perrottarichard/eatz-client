import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

export const getByCoordinates = async (lat, lon) => {
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