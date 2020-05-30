import React, {Component} from "react";
import classes from './Quiz.module.scss'
import Question from "../../components/Question/Question";
import QuizFinished from "../../components/QuizFinished/QuizFinished/QuizFinished";
import Loader from "../../components/UI/Loader/Loader";
import axios from 'axios'
import {urlAllQuiz} from "../../other/url";
import {formatUrlGetQuiz} from "../../utils/async";

export default class Quiz extends Component{

  state = {
    loadQuiz: false,
    isFinished: false,
    results: {},
    answerState: null,
    activeQuestion: 0,
    quiz: []
  }

  async componentDidMount() {
    try {
      const quizId = this.props.match.params.id
      const url = formatUrlGetQuiz(quizId)
      const response = await axios.get(url);
      this.setState({quiz: response.data, loadQuiz: true})
    } catch (e) {
      console.error(e.message)
    }
  }

  isQuizEnd = () => {
    return this.state.activeQuestion === this.state.quiz.length - 1
  }

  retryHandle = () => {
    this.setState({
      isFinished: false,
      results: {},
      answerState: null,
      activeQuestion: 0,
    })
  }

  nextQuestion = () => {
    let  timeiout = setTimeout(() => {
      if (this.isQuizEnd()) {
        this.setState({isFinished: true})
      } else {
        this.setState(prevState => {
          return ({activeQuestion: prevState.activeQuestion + 1, answerState:null})
        })
      }
      clearTimeout(timeiout)
    },1000)
  }

  choiceAnswerHandle = answerId => {
    if (this.state.answerState) {
      return;
    }
    const question = this.state.quiz[this.state.activeQuestion]
    console.log(question.rightId, answerId)
    if (question.rightId === answerId) {
      this.setState({
        results: {...this.state.results, [this.state.activeQuestion]: 'success'},
        answerState: {[answerId]: 'success'}})
    } else {
      this.setState({
        results: {...this.state.results, [this.state.activeQuestion]: 'fail'},
        answerState: {[answerId]: 'fail'}})
    }

    this.nextQuestion();
  }

  render() {
    const question = this.state.quiz[this.state.activeQuestion]

    return (
      <section className={classes.Quiz}>
        <div className={classes['Quiz-wrapper']}>
          <h1 style={!this.state.loadQuiz ? {textAlign: 'center'} : null}>
            Ответьте на все вопросы
          </h1>
          { !this.state.loadQuiz ? <Loader /> :
            this.state.isFinished
            ? <QuizFinished
                questions={this.state.quiz}
                results={this.state.results}
                retryHandle={this.retryHandle}
              />
            : <Question
                questionTitle={question.title}
                answers={question.answers}
                numberQuestion={this.state.activeQuestion + 1}
                allCountQuestion={this.state.quiz.length}
                answerState={this.state.answerState}
                clickHandle = {this.choiceAnswerHandle}
              />
          }
        </div>
      </section>
    )
  }
}