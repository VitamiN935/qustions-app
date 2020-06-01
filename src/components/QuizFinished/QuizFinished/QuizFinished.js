import React from "react";
import classes from './QuizFinished.module.scss'
import Button from "../../UI/Button/Button";
import {Link} from 'react-router-dom'

const getItem = (id, result, question) => {
  const cls = ['fa'];
  cls.push(result === 'success' ? classes.success : classes.fail);
  cls.push(result === 'success' ? 'fa-check ' : 'fa-times ')
  return (
    <li key={id}>
      <span>{+id + 1}. {question.title}</span>
      <i className={cls.join(' ')}> </i>
    </li>
  )
}

export default props => {
  const values = Object.values(props.results);
  const successCount = values.filter(v => v === 'success').length
  return (
    <div className={classes.QuizFinished}>
      <ul>
        {
          Object.keys(props.results).map((id) => {
            return getItem(id, props.results[id], props.questions[id])
          })
        }
      </ul>

      <p>Правильно {successCount} из {values.length}</p>
      <div className={classes['QuizFinished-footbar']}>
        <Button type={'primary'} onClick={props.retryHandle}>Повторить</Button>
        <Link to='/'>
          <Button type={'success'}>Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}