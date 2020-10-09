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
    case 'ADD_CART':
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
      let res = await userService.addItemToCart(user_id, item)
      dispatch({
        type: 'ADD_CART',
        data: res
      })
    } catch (error) {
      console.log(error)
    }
  }
}


export default activeUserReducer