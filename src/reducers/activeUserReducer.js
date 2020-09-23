import userService from "../services/userService"

const initialState = {
  user: null
}

const activeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGOUT':
      return action.data
    case 'GET_USER':
      console.log('GetU reducer', action.data)
      return { ...state, user: action.data }
    default:
      return state
  }
}
export const isAuthenticated = () => {
  return async dispatch => {
    try {
      let res = await userService.getUser()
      console.log('reducerRes', res)
      dispatch({
        type: 'GET_USER',
        data: res
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const clearUser = () => {
  return {
    type: 'USER_LOGOUT',
    data: null
  }
}

export default activeUserReducer