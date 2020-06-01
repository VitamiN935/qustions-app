import * as types from '../Actions/actionTypes'

const initialState = {
  quiz: [],
}

export default function creatorReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_QUESTION:
      return {...state, quiz: [...state.quiz, action.item]}
    case types.RESET_QUIZ_CONTAINER:
      return {...state, quiz: []}
    default: return {...state}
  }
}