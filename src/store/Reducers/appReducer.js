import * as types from '../Actions/actionTypes'

const initialState = {
  alert: null
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HIDE_ALERT:
      return {...state, alert: null};
    case types.SHOW_ALERT:
      return {...state, alert: action.payload}
    default:
      return {...state}
  }
}