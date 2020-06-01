import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from  'react-router-dom'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {actionFetchQuizList} from "../../store/Actions/quizActions";

class QuizList extends Component {

  componentDidMount() {
    this.props.fetchQuizList()
  }

  getAllTests() {
    return this.props.quizList.map((quiz, idx) => {
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
            {this.props.loading ? <Loader /> : this.getAllTests()}
          </ul>
        </section>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList)

function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    quizList: state.quiz.quizList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizList: () => dispatch(actionFetchQuizList())
  }
}
