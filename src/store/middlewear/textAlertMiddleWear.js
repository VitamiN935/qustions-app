import * as types from '../Actions/actionTypes'
import {actionShowAlert} from "../Actions/appActions";

export const textAlertMiddleWear = ({dispatch}) => next => action => {
  if (action.type === types.AUTH_LOGOUT) {
    dispatch(actionShowAlert({type: 'danger', text: 'Вы вышли из системы'}))
  }
  return next(action)
}