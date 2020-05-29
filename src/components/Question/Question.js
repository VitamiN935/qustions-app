import React from "react";
import classes from './Question.module.scss'
import AnswersList from "./AnswersList/AnswersList";

export default ({numberQuestion, allCountQuestion,questionTitle, ...props}) => {
  return (
    <div className={classes.Question}>
      <p className={classes['Question-title']}>
        <span>{numberQuestion}.&nbsp; {questionTitle}</span>
        <span>{numberQuestion} из {allCountQuestion}</span>
      </p>
      <AnswersList {...props}/>
    </div>
  )
}