import userService from "../services/userService"

const initialState = {
  user: undefined
}

const activeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGOUT':
      return initialState
    case 'GET_USER':
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

export default activeUserReducer