import React from 'react'
import classes from  './Input.module.scss'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && touched && shouldValidate
}

export default props => {
  const id = Date.now();
  const inputType = props.type || 'text';
  const cls = [classes.Input]

  if (isInvalid(props)) {
    cls.push(classes.Error)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={id}>{props.text}</label>
      <input
        id={id}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props) ? <span>{props.errorMessage || 'Введите корректное значение'}</span> : null
      }
    </div>
  )
}