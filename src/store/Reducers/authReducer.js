import * as types from '../Actions/actionTypes'

const initialState = {
  token: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {...state, token: action.token}
    case types.AUTH_LOGOUT:
      return {...state, token: null}
    default:
      return {...state}
  }
}
