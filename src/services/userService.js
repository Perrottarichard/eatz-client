import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getUser = async () => {
  const response = await axios.get(`${baseUrl}/authhelpers/login/success`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })
  console.log(response.data)
  return response.data
}

export default { getUser }