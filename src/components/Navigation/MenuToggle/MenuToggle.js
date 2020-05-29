import React from "react";
import classes from './MenuToggle.module.scss'

export default props => {
  const cls = ['fa', classes.MenuToggle];
  if (props.isOpen) {
    cls.push('fa-times', classes.close)
  } else {
    cls.push('fa-bars')
  }

  return (
    <i className={cls.join(' ')} onClick={props.toggleMenu}> </i>
  )
}