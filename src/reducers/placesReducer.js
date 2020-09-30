import { postRequestAddRestaurant } from "../services/dataService"

const initialState = {
  nearbyPlaces: undefined
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_PLACES':
      return initialState
    case 'SET_PLACES':
      return { ...state, nearbyPlaces: action.data }
    case 'REQUEST_ADD_RESTAURANT':
      return state
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
export const requestAddRestaurant = (name, city, country) => {
  return async dispatch => {
    try {
      await postRequestAddRestaurant(name, city, country)
      dispatch({
        type: 'REQUEST_ADD_RESTAURANT',
        data: null
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default placesReducer