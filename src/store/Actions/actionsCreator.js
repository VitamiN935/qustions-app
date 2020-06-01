import axios from 'axios'
import * as types from "./actionTypes";
import {urlAllQuiz} from "../../other/url";

export function actionAddQuestion(item) {
  return {
    type: types.ADD_QUESTION,
    item
  }
}

export function actionCreateQuiz() {
  return async (dispatch, getData) => {
    const state = getData().creator
    await axios.post(urlAllQuiz, state.quiz);
    dispatch(resetQuizContainer())
  }
}

function resetQuizContainer() {
  return {
    type: types.RESET_QUIZ_CONTAINER
  }
}