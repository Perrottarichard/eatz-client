import { postRequestAddRestaurant, getPlaceDetailsRequest, loadMenu, loadPromos } from "../services/dataService"

const initialState = {
  nearbyPlaces: undefined,
  homeGPS: undefined,
  placeDetails: undefined,
  menu: undefined,
  promos: undefined,
  loading: false,
  geoActive: false,
  notify: { open: false, severity: '', message: '' }
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_PLACES':
      return initialState
    case 'SET_LOADING':
      return { ...state, loading: action.data }
    case 'CLEAR_LOADING':
      return { ...state, loading: action.data }
    case 'GEO_ACTIVE':
      return { ...state, geoActive: action.data }
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
    case 'NOTIFY':
      return { ...state, notify: action.data }
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
export const geoActive = (bool) => {
  return {
    type: 'GEO_ACTIVE',
    data: bool
  }
}
export const setHomeGPS = (lat, lon) => {
  return {
    type: 'SET_HOME_GPS',
    data: { lat: lat, lon: lon }
  }
}
export const requestAddRestaurant = (name, lat, lon) => {
  return async dispatch => {
    dispatch(setLoading())
    try {
      await postRequestAddRestaurant(name, lat, lon)
      dispatch({
        type: 'REQUEST_ADD_RESTAURANT',
        data: null
      })
      dispatch(clearLoading())
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'success', message: 'Submitted' }
      })
    } catch (error) {
      console.log(error)
      dispatch(clearLoading())
      dispatch({
        type: 'NOTIFY',
        data: { open: true, severity: 'error', message: 'Something went wrong...' }
      })
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