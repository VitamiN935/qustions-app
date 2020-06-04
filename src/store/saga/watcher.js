import {takeEvery, put, call} from 'redux-saga/effects'
import * as types from '../Actions/actionTypes'
import {fetchQuizError,fetchQuizStart, fetchQuizSuccess} from "../Actions/quizActions";
import {formatUrlGetQuiz} from "../../utils/async";
import axios from "axios";

export function* sagaWatcher() {
  yield takeEvery(types.SAGA_FETCH_QUIZ, sagaFetchQuiz)
}

function* sagaFetchQuiz({id}) {
  try {
    yield put(fetchQuizStart())
    const url = yield call(formatUrlGetQuiz.bind(null, id))
    const data = yield call(sagaFetchQuizHelper.bind(null, url))
    yield put(fetchQuizSuccess(data))
  } catch (e) {
    yield put(fetchQuizError(e.message))
  }
}

async function sagaFetchQuizHelper(url) {
  const response = await axios.get(url);
  return response.data
}