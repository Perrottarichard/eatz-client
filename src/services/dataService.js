import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

export const getByCoordinates = async (lat, lon) => {
  const response = await axios.post(`${baseUrl}/searchByCoordinates`, {
    lat: lat,
    lon: lon
  })
  return response.data
}