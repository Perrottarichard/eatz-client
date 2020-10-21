import { postRequestAddRestaurant, getPlaceDetailsRequest, loadMenu, loadPromos } from "../services/dataService"

const initialState = {
  nearbyPlaces: undefined,
  homeGPS: undefined,
  placeDetails: undefined,
  menu: undefined,
  promos: undefined
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_PLACES':
      return initialState
    case 'SET_HOME_GPS':
      return { ...state, homeGPS: action.data }
    case 'SET_PLACES':
      return { ...state, nearbyPlaces: action.data }
    case 'GET_PLACE_DETAILS':
      return { ...state, placeDetails: action.data }
    case 'REQUEST_ADD_RESTAURANT':
      return state
    case 'INIT_MENU':
      return { ...state, menu: action.data }
    case 'INIT_PROMOS':
      return { ...state, promos: action.data }
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
export const setHomeGPS = (lat, lon) => {
  return {
    type: 'SET_HOME_GPS',
    data: { lat: lat, lon: lon }
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
export const initMenu = () => {
  return async dispatch => {
    try {
      let res = await loadMenu()
      dispatch({
        type: 'INIT_MENU',
        data: res
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const initPromos = () => {
  return async dispatch => {
    try {
      let res = await loadPromos()
      dispatch({
        type: 'INIT_PROMOS',
        data: res
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default placesReducer