import React, {Component} from 'react'
import classes from './QuizCreator.module.scss'
import ButtonS from "../../components/UI/ButtonStatic/ButtonS";
import Input from "../../components/UI/Input/Input";
import {createControl} from "../../utils/control";
import {clone} from "../../utils/copy";
import Select from "../../components/UI/Select/Select";
import {checkValidControl, checkValidForm} from "../../utils/validation";

const initialState = {
  quiz: [],
  rightAnswer: 1,
  isValidForm: false,
  formControls: createFormControls()
}

function createOptionControl(number) {
  return createControl({
    text: `Вариант ${number}`,
    errorMessage: 'Поле пустое'
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      text: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {

  state = { ...clone(initialState) }

  onSubmitHandler = e => e.preventDefault();

  getQuestionData = () => {
    const {question, option1, option2, option3, option4} = this.state.formControls

    return {
      title: question.value,
      rightId: this.state.rightAnswer,
      answers: [
        {id: 1, text: option1.value},
        {id: 2, text: option2.value},
        {id: 3, text: option3.value},
        {id: 4, text: option4.value},
      ]
    }
  }

  addQuestionHandler = () => {
    const quiz = clone(this.state.quiz);
    quiz.push(this.getQuestionData())
    this.setState({ ...clone(initialState), quiz })
  }

  createTestHandler = () => {
  }

  validateControlHandler = (value, controlName) => {
    const formControls = clone(this.state.formControls)
    const control = formControls[controlName];

    control.value = value;
    control.touched = true;
    control.valid = checkValidControl(control.value, control.validation)

    formControls[controlName] = control
    let isValidForm = checkValidForm(formControls)

    this.setState({formControls, isValidForm})
  }

  onChangeSelector = value => {
    this.setState({rightAnswer: value})
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName]
      return (
        <React.Fragment key={idx}>
          <Input
            {...control}
            shouldValidate={!!control.validation}
            onChange={e => this.validateControlHandler(e.target.value, controlName)}
          />
          {idx === 0 ? <hr/> : null}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <section>
          <h1>Создание теста</h1>
          <form onSubmit={this.onSubmitHandler}>
            {this.renderControls()}

            <Select
              value={this.state.rightAnswer}
              text={'Выберите правильный ответ'}
              onChange={e => this.onChangeSelector(e.target.value)}
              options={[
                {text: '1', value: 1},
                {text: '2', value: 2},
                {text: '3', value: 3},
                {text: '4', value: 4},
              ]}
            />

            <ButtonS
              style={{marginRight: '20px'}}
              type={'primary'}
              onClick={this.addQuestionHandler}
              disabled={!this.state.isValidForm}
            >Добавить вопрос</ButtonS>
            <ButtonS
              type={'success'}
              onClick={this.createTestHandler}
              disabled={this.state.quiz.length === 0}
            >Создать тест</ButtonS>

          </form>
        </section>
      </div>
    )
  }
}