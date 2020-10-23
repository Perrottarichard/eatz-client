import userService from "../services/userService"

const initialState = {
  user: undefined,
  notify: { open: false, severity: '', message: '' },
  redirectTo: undefined
}

const activeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGOUT':
      return initialState
    case 'LOCAL_SIGN_IN':
      return { ...state, user: action.data }
    case 'REDIRECT':
      return { ...state, redirectTo: action.data }
    case 'CLEAR_REDIRECT':
      return { ...state, redirectTo: action.data }
    case 'REGISTER':
      return { ...state, user: action.data }
    case 'GET_USER':
      return { ...state, user: action.data }
    case 'ADD_FAVORITE':
      return { ...state, user: action.data }
    case 'REMOVE_FAVORITE':
      return { ...state, user: action.data }
    case 'ADD_PIZZA_TO_CART':
      return { ...state, user: action.data }
    case 'ADD_BEVERAGES_TO_CART':
      return { ...state, user: action.data }
    case 'REMOVE_CART':
      return { ...state, user: action.data }
    case 'SET_ACTIVE_CART_BILLING':
      return { ...state, user: action.data }
    case 'RESET_CART':
      return { ...state, user: action.data }
    case 'ADD_ORDER':
      return { ...state, user: action.data }
    case 'ADD_ADDRESS':
      return { ...state, user: action.data }
    case 'EDIT_ADDRESS':
      return { ...state, user: action.data }
    case 'NOTIFY':
      return { ...state, notify: action.data }
    default:
      return state
  }
}

export const closeNotify = () => {
  const clear = { open: false, severity: '', message: '' }
  return {
    type: 'NOTIFY',
    data: clear
  }
}
export const redirect = link => {
  return {
    type: 'REDIRECT',
    data: link
  }
}
export const clearRedirect = () => {
  return {
    type: 'CLEAR_REDIRECT',
    data: undefined
  }
}
export const signIn = (userObj) => {
  return async dispatch => {
    try {
      let res = await userService.localSignIn(userObj)
      dispatch({
        type: 'LOCAL_SIGN_IN',
        data: res
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const register = (newUserObj) => {
  return async dispatch => {
    try {
      let res = await userService.localRegister(newUserObj)
      dispatch({
        type: 'LOCAL_REGISTER',
        data: res
      })
      dispatch({
        type: 'REDIRECT',
        data: '/'
      })
      dispatch({
        type: 'CLEAR_REDIRECT',
        data: undefined
      })
    } catch (error) {
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: error.message }
      })
      console.log(error)
    }
  }
}
export const isAuthenticated = () => {
  return async dispatch => {
    try {
      let res = await userService.getUser()
      dispatch({
        type: 'GET_USER',
        data: res.user
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const getAtDashboard = () => {
  return async dispatch => {
    try {
      let res = await userService.getUserFromDash()
      dispatch({
        type: 'GET_USER',
        data: res.user
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const clearUser = () => {
  return async dispatch => {
    try {
      await userService.logoutUser()
      dispatch({
        type: 'USER_LOGOUT',
        data: null
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const addFavorite = (place_id, user_id) => {
  return async dispatch => {
    try {
      let res = await userService.addFavoriteRestaurant(place_id, user_id)
      dispatch({
        type: 'ADD_FAVORITE',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Added' }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const removeFavorite = (place_id, user_id) => {
  return async dispatch => {
    try {
      let res = await userService.removeFavoriteRestaurant(place_id, user_id)
      dispatch({
        type: 'REMOVE_FAVORITE',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Removed' }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const addCart = (user_id, item) => {
  return async dispatch => {
    try {
      let res = await userService.addPizzaToCart(user_id, item)
      dispatch({
        type: 'ADD_PIZZA_TO_CART',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Added' }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}

export const addBeverage = (user_id, beveragesToAddObj) => {
  return async dispatch => {
    try {
      let res = await userService.addBeveragesToCart(user_id, beveragesToAddObj)
      dispatch({
        type: 'ADD_BEVERAGES_TO_CART',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Added' }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const removeCart = (user_id, item_id) => {
  return async dispatch => {
    try {
      let res = await userService.removeItemFromCart(user_id, item_id)
      dispatch({
        type: 'REMOVE_CART',
        data: res
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const setActiveCartBilling = (user_id, totalPrice, newTotal, diff, promoApplied) => {
  return async dispatch => {
    try {
      let res = await userService.updateActiveCartBilling(user_id, totalPrice, newTotal, diff, promoApplied)
      dispatch({
        type: 'SET_ACTIVE_CART_BILLING',
        data: res
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const resetCart = (user_id) => {
  return async dispatch => {
    try {
      let res = await userService.clearCart(user_id)
      dispatch({
        type: 'RESET_CART',
        data: res
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const addOrder = (user_id) => {
  return async dispatch => {
    try {
      let res = await userService.addNewOrder(user_id)
      dispatch({
        type: 'ADD_ORDER',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Success' }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const addAddress = (user_id, addressObject) => {
  return async dispatch => {
    try {
      let res = await userService.addNewAddress(user_id, addressObject)
      dispatch({
        type: 'ADD_ADDRESS',
        data: res
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export const editAddress = (user_id, indexToEdit, addressObject) => {
  return async dispatch => {
    try {
      let res = await userService.editExistingAddress(user_id, indexToEdit, addressObject)
      dispatch({
        type: 'EDIT_ADDRESS',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Updated' }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
    }
  }
}
export default activeUserReducer