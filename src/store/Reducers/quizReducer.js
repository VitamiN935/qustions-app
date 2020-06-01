import * as types from "../Actions/actionTypes";


const initialState = {
  error: null,
  loading: false,
  quizList: [],
  isFinished: false,
  results: {},
  answerState: null,
  activeQuestion: 0,
  quiz: null
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_QUIZ_START:
      return {...state, loading: true}
    case types.FETCH_QUIZ_LIST_SUCCESS:
      return {...state, loading: false, quizList: action.payload}
    case types.FETCH_QUIZ_ERROR:
      return {...state, loading: false, error: action.error}
    case types.FETCH_QUIZ_SUCCESS:
      return {...state,loading: false, quiz: action.payload}
    case types.QUIZ_SET_STATE:
      return {...state, results: action.results, answerState: action.answerState}
    case types.QUIZ_FINISHED:
      return {...state, isFinished: true}
    case types.NEXT_QUESTION:
      return {...state, answerState: null, activeQuestion: action.activeQuestion}
    case types.RETRY_QUIZ:
      return {
        ...state,
        results: {},
        answerState: null,
        activeQuestion: 0,
        isFinished: false
      }
    default:
      return {...state};
  }
}