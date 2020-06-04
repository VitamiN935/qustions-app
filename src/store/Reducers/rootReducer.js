import {combineReducers} from "redux";
import quizReducer from "./quizReducer";
import creatorReducer from "./creatorReducer";
import authReducer from "./authReducer";
import {appReducer} from "./appReducer";

export default combineReducers({
  quiz: quizReducer,
  creator: creatorReducer,
  auth: authReducer,
  app: appReducer
})