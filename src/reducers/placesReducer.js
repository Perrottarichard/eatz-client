// import userService from "../services/userService"

const initialState = {
  nearbyPlaces: undefined
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_PLACES':
      return initialState
    case 'SET_PLACES':
      return { ...state, nearbyPlaces: action.data }
    default:
      return state
  }
}
export const setPlaces = (places) => {
  return {
    type: 'SET_PLACES',
    data: places
  }
}

export const clearPlaces = () => {
  return {
    type: 'USER_LOGOUT',
    data: null
  }
}

export default placesReducer