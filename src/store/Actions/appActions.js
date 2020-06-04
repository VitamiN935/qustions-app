import * as types from './actionTypes'

let timeout;

export function actionShowAlert(payload) {
  return dispatch => {
    dispatch(showAlert(payload))
    timeout = setTimeout(() => dispatch(actionHideAlert()), 3000)
  }
}

function showAlert(payload) {
  return {
    type: types.SHOW_ALERT,
    payload,
  }
}

export function actionHideAlert() {
  clearTimeout(timeout)
  return {
    type: types.HIDE_ALERT,
  }
}