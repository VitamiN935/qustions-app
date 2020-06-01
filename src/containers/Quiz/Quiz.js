import React, {Component} from "react";
import classes from './Quiz.module.scss'
import Question from "../../components/Question/Question";
import QuizFinished from "../../components/QuizFinished/QuizFinished/QuizFinished";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {actionChoiceAnswerClicked, actionFetchQuiz, actionRetryQuiz} from "../../store/Actions/quizActions";

class Quiz extends Component{

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  retryHandle = () => {
    this.props.retryQuiz()
  }

  choiceAnswerHandle = answerId => {
    this.props.answerClicked(answerId)
  }

  render() {
    return (
      <section className={classes.Quiz}>
        <div className={classes['Quiz-wrapper']}>
          <h1 style={{textAlign: 'center'}}>
            Ответьте на все вопросы
          </h1>
          { this.props.loading || !this.props.quiz ? <Loader /> :
            this.props.isFinished
            ? <QuizFinished
                questions={this.props.quiz}
                results={this.props.results}
                retryHandle={this.retryHandle}
              />
            : <Question
                questionTitle={this.props.quiz[this.props.activeQuestion].title}
                answers={this.props.quiz[this.props.activeQuestion].answers}
                numberQuestion={this.props.activeQuestion + 1}
                allCountQuestion={this.props.quiz.length}
                answerState={this.props.answerState}
                clickHandle = {this.choiceAnswerHandle}
              />
          }
        </div>
      </section>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz)

function mapStateToProps(state) {
  return {
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    answerState: state.quiz.answerState,
    activeQuestion: state.quiz.activeQuestion,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuiz: id => dispatch(actionFetchQuiz(id)),
    answerClicked: id => dispatch(actionChoiceAnswerClicked(id)),
    retryQuiz: () => dispatch(actionRetryQuiz())
  }
}
