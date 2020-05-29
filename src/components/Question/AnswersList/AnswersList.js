import React from "react";
import classes from './AnswersList.module.scss'
import ListItem from "./ListItem/ListItem";

export default props => {
  return (
    <ul className={classes.AnswersList}>
      {
        props.answers.map((answer, idx) => {
          return (
            <ListItem
              key={idx}
              answer={answer}
              clickHandle={props.clickHandle}
              state={props.answerState ? props.answerState[answer.id] : null}
            />
          )
        })
      }
    </ul>
  )
}