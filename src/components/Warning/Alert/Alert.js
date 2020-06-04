import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {actionHideAlert} from "../../../store/Actions/appActions";
import './Alert.scss'

const Alert = () => {
  const alert = useSelector(state => state.app.alert) || {}
  const dispatch = useDispatch();
  if (!alert.text) return null;

  return (
    <div
      className={`alert Alert-${alert.type || 'warning'} alert-dismissible Alert`}
      role="alert">
      <span>{alert.text}</span>
      <i
        className="fa fa-times icon"
        onClick={() => dispatch(actionHideAlert())}
      > </i>
    </div>
  )
}

export default Alert
