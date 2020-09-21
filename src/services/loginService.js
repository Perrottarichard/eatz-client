import axios from 'axios'
const baseUrl = 'http://localhost:3001/auth'

export const userLoginGoogle = async user => {
  const response = await axios.get(`${baseUrl}/google`)
  return response.data
}
export const userLoginFacebook = async user => {
  const response = await axios.get(`${baseUrl}/facebook`)
  return response.data
}
