import {combineReducers} from "redux";
import quizReducer from "./quizReducer";
import creatorReducer from "./creatorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  quiz: quizReducer,
  creator: creatorReducer,
  auth: authReducer
})