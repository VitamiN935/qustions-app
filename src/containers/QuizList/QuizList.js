import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from  'react-router-dom'

export default class QuizList extends Component {

  getAllTests() {
    return [1,2,3].map((test, idx) => {
      return (
        <li>
          <NavLink to={`/quiz/${test}`}>
            Тест {test}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <section>
          <h1>Список тестов</h1>
          <ul>
            {this.getAllTests()}
          </ul>
        </section>
      </div>
    )
  }
}