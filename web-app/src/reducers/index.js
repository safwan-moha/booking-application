import { combineReducers } from 'redux'
import { LOGIN_CLICKED, LOGIN_SUCCESS, USERNAME_CHANGED,
  LOGIN_ERROR, APPOINTMENTS_FETCHED } from './../actions'

let initialState = {}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return Object.assign({}, state, { username: action.payload })
    case LOGIN_CLICKED:
      return Object.assign({}, state, { isLoading: true })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLogged: true, isLoading: false })
    case LOGIN_ERROR:
      return Object.assign({}, state, { isLogged: false, isLoading: false })
    default:
      return state
  }
}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPOINTMENTS_FETCHED:
      return Object.assign({}, state, { appointments: action.payload || [] })
    default:
      return state
  }
}

const allReducer = combineReducers({
  loginReducer,
  bookingReducer
})

export default allReducer
