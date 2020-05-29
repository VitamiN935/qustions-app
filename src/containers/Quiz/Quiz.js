import React, {Component} from "react";
import classes from './Quiz.module.scss'
import Question from "../../components/Question/Question";
import QuizFinished from "../../components/QuizFinished/QuizFinished/QuizFinished";

export default class Quiz extends Component{

  state = {
    isFinished: false,
    results: {},
    answerState: null,
    activeQuestion: 0,
    quiz: [
      {
        title: 'Какого цвета нет в радуге?',
        rightId: 2,
        answers: [
          {id: 1, text: 'Зеленый'},
          {id: 2, text: 'Оливковый'},
          {id: 3, text: 'Желтый'},
          {id: 4, text: 'Красный'},
        ]
      },
      {
        title: 'Что из перечисленного не относится к фруктам?',
        rightId: 3,
        answers: [
          {id: 1, text: 'Апельсин'},
          {id: 2, text: 'Яблоко'},
          {id: 3, text: 'Арбуз'},
          {id: 4, text: 'Киви'},
        ]
      },
    ]
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
          <h1>Ответьте на все вопросы</h1>
          {
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