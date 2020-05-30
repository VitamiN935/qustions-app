import React from 'react'
import classes from './Select.module.scss'

export default props => {
  const id = Math.random();
  return (
    <div className={classes.Select}>
      <label htmlFor={id}>{props.text}</label>
      <select id={id} value={props.value} onChange={props.onChange}>
        {
          props.options.map((option, idx) => {
            return (
              <option key={idx} value={option.value}>{option.text}</option>
            )
          })
        }
      </select>
    </div>
  )
}