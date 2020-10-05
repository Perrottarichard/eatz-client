import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getUser = async () => {
  const response = await axios.get(`${baseUrl}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },

  })
  return response.data
}

const getUserFromDash = async () => {
  const response = await axios.get(`${baseUrl}/authhelpers/login/success`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },

  })
  return response.data
}
const logoutUser = async () => {
  const response = await axios.get(`${baseUrl}/authhelpers/logout`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const addFavoriteRestaurant = async (place_id, user_id) => {
  const response = await axios.put(`${baseUrl}/account/favorite`, {
    user_id: user_id,
    place_id: place_id
  }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const removeFavoriteRestaurant = async (place_id, user_id) => {
  const response = await axios.put(`${baseUrl}/account/removefavorite`, {
    user_id: user_id,
    place_id: place_id
  }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}


export default { getUser, getUserFromDash, logoutUser, addFavoriteRestaurant, removeFavoriteRestaurant }