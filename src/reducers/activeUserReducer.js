import userService from "../services/userService"

const initialState = {
  user: undefined,
  notify: { open: false, severity: '', message: '' },
  redirectTo: undefined,
  loading: false
}

const activeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGOUT':
      return initialState
    case 'SET_LOADING':
      return { ...state, loading: action.data }
    case 'CLEAR_LOADING':
      return { ...state, loading: action.data }
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
    case 'ADD_PAYMENT_INFO':
      return { ...state, user: action.data }
    case 'EDIT_PAYMENT_INFO':
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
export const setLoading = () => {
  return {
    type: 'SET_LOADING',
    data: true
  }
}
export const clearLoading = () => {
  return {
    type: 'CLEAR_LOADING',
    data: false
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
      if (error.response.status === 401) {
        dispatch({
          type: 'NOTIFY',
          data: { open: true, severity: 'error', message: 'Incorrect email or password' }
        })
      }
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
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Account created. You can sign in now.' }
      })
    } catch (error) {
      if (error.response.status === 400) {
        dispatch({
          type: 'NOTIFY',
          data: { open: true, severity: 'error', message: error.response.data.error }
        })
      }
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
    dispatch(setLoading())
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
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
    }
  }
}
export const removeFavorite = (place_id, user_id) => {
  return async dispatch => {
    dispatch(setLoading())
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
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
    }
  }
}
export const addCart = (user_id, item) => {
  return async dispatch => {
    dispatch(setLoading())
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
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
    }
  }
}

export const addBeverage = (user_id, beveragesToAddObj) => {
  return async dispatch => {
    try {
      dispatch(setLoading())
      let res = await userService.addBeveragesToCart(user_id, beveragesToAddObj)
      dispatch({
        type: 'ADD_BEVERAGES_TO_CART',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Added' }
      })
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
    }
  }
}
export const removeCart = (user_id, item_id) => {
  return async dispatch => {
    dispatch(setLoading())
    try {
      let res = await userService.removeItemFromCart(user_id, item_id)
      dispatch({
        type: 'REMOVE_CART',
        data: res
      })
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
    }
  }
}
export const setActiveCartBilling = (user_id, totalPrice, newTotal, diff, promoApplied) => {
  return async dispatch => {
    try {
      dispatch(setLoading())
      let res = await userService.updateActiveCartBilling(user_id, totalPrice, newTotal, diff, promoApplied)
      dispatch({
        type: 'SET_ACTIVE_CART_BILLING',
        data: res
      })
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
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
export const addOrder = (user_id, cardTipAmount, paymentChoice) => {
  return async dispatch => {
    dispatch(setLoading())
    try {
      let res = await userService.addNewOrder(user_id, cardTipAmount, paymentChoice)
      dispatch({
        type: 'ADD_ORDER',
        data: res
      })
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Success' }
      })
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
    }
  }
}
export const addAddress = (user_id, addressObject) => {
  return async dispatch => {
    dispatch(setLoading())
    try {
      let res = await userService.addNewAddress(user_id, addressObject)
      dispatch({
        type: 'ADD_ADDRESS',
        data: res
      })
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
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

export const addPaymentInfo = (user_id, infoObject) => {
  return async dispatch => {
    dispatch(setLoading())
    try {
      let res = await userService.addNewPaymentInfo(user_id, infoObject)
      dispatch({
        type: 'ADD_PAYMENT_INFO',
        data: res
      })
      dispatch(clearLoading())
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong' }
      })
      dispatch(clearLoading())
    }
  }
}

export const editPaymentInfo = (user_id, indexToEdit, infoObject) => {
  return async dispatch => {
    try {
      let res = await userService.editExistingPayment(user_id, indexToEdit, infoObject)
      dispatch({
        type: 'EDIT_PAYMENT_INFO',
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