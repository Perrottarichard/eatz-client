import { postRequestAddRestaurant, getPlaceDetailsRequest, getPlaceDetailsRequestPhoto } from "../services/dataService"

const initialState = {
  nearbyPlaces: undefined,
  placeDetails: undefined,
  placeDetailsPhoto: undefined
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_PLACES':
      return initialState
    case 'SET_PLACES':
      return { ...state, nearbyPlaces: action.data }
    case 'GET_PLACE_DETAILS':
      return { ...state, placeDetails: action.data }
    case 'GET_PLACE_DETAILS_PHOTO':
      return { ...state, placeDetailsPhoto: [action.data] }
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
export const getPlaceDetails = (place_id) => {
  return async dispatch => {
    try {
      let res = await getPlaceDetailsRequest(place_id)
      dispatch({
        type: 'GET_PLACE_DETAILS',
        data: res.result
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const getPlaceDetailsPhoto = (photo_ref) => {
  return async dispatch => {
    try {
      let res = await getPlaceDetailsRequestPhoto(photo_ref)
      dispatch({
        type: 'GET_PLACE_DETAILS_PHOTO',
        data: res
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default placesReducer