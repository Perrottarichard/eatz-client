import userService from "../services/userService"

const initialState = {
  user: undefined,
}

const activeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGOUT':
      return initialState
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
    default:
      return state
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
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
    }
  }
}
export default activeUserReducer