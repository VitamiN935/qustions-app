import * as types from "./actionTypes";
import axios from 'axios'
import {urlAllQuiz} from "../../other/url";

export function actionFetchQuizList() {
  return async (dispatch) => {
    dispatch(fetchQuizStart())
    try {
      const response = await axios.get(urlAllQuiz)
      const quizList = [];

      Object.keys(response.data).forEach((testName, idx) => {
        quizList.push({id: idx, name: testName})
      })
      dispatch(fetchQuizListSuccess(quizList))
    } catch (e) {
      dispatch(fetchQuizError(e))
    }
  }
}

export function actionFetchQuiz(quizId) {
  return {
    type: types.SAGA_FETCH_QUIZ,
    id: quizId
  }
}

export function actionChoiceAnswerClicked(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) return;

    const question = state.quiz[state.activeQuestion]
    if (question.rightId === answerId) {
      dispatch(quizSetState(
        {...state.results, [state.activeQuestion]: 'success'},
        {[answerId]: 'success'}
      ))
    } else {
      dispatch(quizSetState(
        {...state.results, [state.activeQuestion]: 'fail'},
        {[answerId]: 'fail'}
      ))
    }

    const timeout = setTimeout(() => {
      if (state.activeQuestion === state.quiz.length - 1) {
        dispatch(quizFinished());
      } else {
        dispatch(nextQuestion(state.activeQuestion + 1))
      }
      clearTimeout(timeout)
    }, 1000)
  }
}

export function actionRetryQuiz() {
  return {
    type: types.RETRY_QUIZ
  }
}

function nextQuestion(activeQuestion) {
  return {
    type: types.NEXT_QUESTION,
    activeQuestion
  }
}

function quizFinished() {
  return {
    type: types.QUIZ_FINISHED
  }
}

function quizSetState(results, answerState) {
  return {
    type: types.QUIZ_SET_STATE,
    results,
    answerState
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: types.FETCH_QUIZ_SUCCESS,
    payload: quiz
  }
}

export function fetchQuizStart() {
  return {
    type: types.FETCH_QUIZ_START
  }
}

export function fetchQuizListSuccess(payload) {
  return {
    type: types.FETCH_QUIZ_LIST_SUCCESS,
    payload
  }
}

export function fetchQuizError(error) {
  return {
    type: types.FETCH_QUIZ_ERROR,
    error
  }
}