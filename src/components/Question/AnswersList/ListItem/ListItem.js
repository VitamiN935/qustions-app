import React from "react";
import classes from './ListItem.module.scss'

export default props => {
  const cls = [classes.ListItem];
  if (props.state) {
    cls.push(props.state === 'success' ? classes.success : classes.fail)
  }
  return (
    <li
      className={cls.join(' ')}
      onClick={() => props.clickHandle(props.answer.id)}
    >{props.answer.text}</li>
  )
}