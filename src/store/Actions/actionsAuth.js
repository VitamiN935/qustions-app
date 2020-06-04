import {urlSignIn, urlSignUp} from "../../other/url";
import {API_KEY} from "../../keys";
import axios from "axios";
import * as types from "./actionTypes";
import {actionShowAlert} from "./appActions";

export function actionLogin(email, password, isLogin) {
  return async dispatch => {
    const body = {email, password, returnSecureToken: true}
    let url = urlSignUp + API_KEY;
    if (isLogin) {
      url = urlSignIn + API_KEY
    }
    let text = isLogin ? 'Вы авторизованы' : 'Поздравляем с регистрацией!'
    try {
      const response = await axios.post(url, body)
      const data = response.data;
      const expDate = new Date().getTime() + data.expiresIn * 1000

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('expDate', expDate)

      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
      dispatch(actionShowAlert({text, type: 'success'}))
    } catch (e) {
      dispatch(actionShowAlert({text: 'Email или Пароль не верны', type: 'danger'}))
    }
  }
}

export function actionLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate')
  return {
    type: types.AUTH_LOGOUT
  }
}

export function actionAutoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(actionLogout())
    } else {
      const expDate = +localStorage.getItem('expDate');
      if (new Date().getTime() >= expDate) {
        dispatch(actionLogout())
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((expDate - new Date()) / 1000))
      }
    }
  }
}

function authSuccess(token) {
  return {
    type: types.AUTH_SUCCESS,
    token,
  }
}

function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(actionLogout())
    }, time * 1000)
  }
}

