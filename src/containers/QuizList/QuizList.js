import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from  'react-router-dom'
import axios from 'axios'
import {urlAllQuiz} from "../../other/url";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {

  state = {
    loadData: false,
    quizList: []
  }

  async componentDidMount() {
    try {
      const response = await axios.get(urlAllQuiz)
      const quizList = [];

      Object.keys(response.data).forEach((testName, idx) => {
        quizList.push({id: idx, name: testName})
      })

      this.setState({quizList, loadData: true})
    } catch (e) {
      console.error(e.message)
    }
  }

  getAllTests() {
    return this.state.quizList.map((quiz, idx) => {
      return (
        <li key={quiz.name + '-' + quiz.id}>
          <NavLink to={`/quiz/${quiz.name}`}>
            {`Teст № ${idx + 1}`}
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
            {this.state.loadData ? this.getAllTests() : <Loader />}
          </ul>
        </section>
      </div>
    )
  }
}