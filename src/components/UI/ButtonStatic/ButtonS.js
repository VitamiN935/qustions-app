import React from "react";
import classes from './ButtonS.module.scss'
import PropTypes from 'prop-types'

export default function ButtonS(props){
  const cls = [classes.Button, classes[props.type]];
  if (props.transform) {
    cls.push(classes.transform)
  }
  return (
    <button
      style={props.style}
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

ButtonS.propTypes = {
  type: PropTypes.string,
  transform: PropTypes.bool,
  onClick: PropTypes.func
}

ButtonS.defaultProps = {
  type: 'standard',
  transform: false,
  onClick: f => f
}

