import axios from 'axios'

//development
const baseUrl = 'http://localhost:3001/api'
const authUrl = 'http://localhost:3001'

//production
// const baseUrl = 'https://pizzapizzadelivery.herokuapp.com/api'
// const authUrl = 'https://pizzapizzadelivery.herokuapp.com'

const localSignIn = async (userObj) => {
  const response = await axios.post(`${authUrl}/auth/local/signin`, userObj, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,

    },
  })
  return response.data
}

const localRegister = async (newUserObj) => {
  const response = await axios.post(`${authUrl}/auth/local/register`, newUserObj, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,

    },
  })
  return response.data
}

const getUser = async () => {
  const response = await axios.get(`${baseUrl}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,

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
const addPizzaToCart = async (user_id, item) => {
  const response = await axios.put(`${baseUrl}/account/addPizza`, { user_id: user_id, item: item }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const addBeveragesToCart = async (user_id, item) => {
  const response = await axios.put(`${baseUrl}/account/addBeverages`, { user_id: user_id, item: item }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const removeItemFromCart = async (user_id, item_id) => {
  const response = await axios.put(`${baseUrl}/account/removeCart`, { user_id: user_id, item_id: item_id }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const updateActiveCartBilling = async (user_id, totalPrice, newTotal, diff, promoApplied) => {
  const response = await axios.put(`${baseUrl}/account/updateActiveCartBilling`, { user_id: user_id, totalPrice: totalPrice, newTotal: newTotal, diff: diff, promoApplied: promoApplied }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  console.log(response.data)
  return response.data
}
const clearCart = async (user_id) => {
  const response = await axios.put(`${baseUrl}/account/clearCart`, { user_id: user_id }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const addNewOrder = async (user_id) => {
  const response = await axios.put(`${baseUrl}/account/addNewOrder`, { user_id: user_id }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const addNewAddress = async (user_id, addressObject) => {
  const response = await axios.put(`${baseUrl}/account/addNewAddress`, { user_id: user_id, addressObject: addressObject }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const editExistingAddress = async (user_id, indexToEdit, addressObject) => {
  const response = await axios.put(`${baseUrl}/account/editAddress`, { user_id: user_id, indexToEdit: indexToEdit, addressObject: addressObject }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const addNewPaymentInfo = async (user_id, infoObject) => {
  const response = await axios.put(`${baseUrl}/account/addNewPaymentInfo`, { user_id: user_id, infoObject: infoObject }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}
const editExistingPayment = async (user_id, indexToEdit, infoObject) => {
  const response = await axios.put(`${baseUrl}/account/editPayment`, { user_id: user_id, indexToEdit: indexToEdit, infoObject: infoObject }, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
  })
  return response.data
}

export default {
  localSignIn,
  localRegister,
  getUser,
  getUserFromDash,
  logoutUser,
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
  addPizzaToCart,
  addBeveragesToCart,
  removeItemFromCart,
  updateActiveCartBilling,
  clearCart,
  addNewOrder,
  addNewAddress,
  editExistingAddress,
  addNewPaymentInfo,
  editExistingPayment
}