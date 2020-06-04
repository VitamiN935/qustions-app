import * as types from '../Actions/actionTypes'
import {actionShowAlert} from "../Actions/appActions";

const keys = ['fuck', 'php']

export const filterMiddleWear = ({dispatch}) => next => action => {
  if (action.type === types.ADD_QUESTION) {
    // concat all words in question to one array
    const words = [action.item.title].concat(action.item.answers.map(i => i.text)).join(' ')
     const findWarningWords = keys.filter(key => words.includes(key));
     if (findWarningWords.length) {
       dispatch(actionShowAlert({type: 'danger ', text:'Простите, цензура'}))
       return  null;
     }
  }

  return next(action);
}