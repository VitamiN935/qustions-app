import React, {Component} from 'react'
import classes from  './Auth.module.scss'
import ButtonS from "../../components/UI/ButtonStatic/ButtonS";
import Input from "../../components/UI/Input/Input";
import {checkValidControl, checkValidForm} from "../../utils/validation";
import {createControl} from "../../utils/control";

export default class Auth extends Component {

  state = {
    isValidForm: false,
    formControls: {
      email: createControl({
        type:'email',
        text:'Email',
        errorMessage: 'Укажите корректный email',
      }, {required: true, email: true}),
      password: createControl({
        type:'password',
        text:'Пароль',
        errorMessage: 'Недасточно символов',
      }, {required: true, minLength: 6})
    }
  }

  onSubmit = e => e.preventDefault()
  onLoginHandle = () => {
    console.log('Login handle')
  }
  onRegisterHandle = () => {}

  changeControlHandle = (value, controlName) => {
    const formControls = clone(this.state.formControls);
    const control = formControls[controlName];

    control.value = value;
    control.touched = true
    control.valid = checkValidControl(control.value, control.validation)

    let isValidForm = checkValidForm(formControls)

    this.setState({formControls, isValidForm})
  }

  getAllControls = () => {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={idx}
          {...control}
          shouldValidate={!!control.validation}
          onChange={e => this.changeControlHandle(e.target.value.trim(), controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <section>
          <h1>Авторизация</h1>
          <form onSubmit={this.onSubmit} className={classes.AuthForm}>
            {this.getAllControls()}
            <ButtonS
              style={{marginRight: '20px'}}
              type={'success'}
              onClick={this.onLoginHandle}
              disabled={!this.state.isValidForm}
            >
              Войти
            </ButtonS>

            <ButtonS
              type={'primary'}
              onClick={this.onRegisterHandle}
              disabled={!this.state.isValidForm}
            >
              Зарегистироваться
            </ButtonS>
          </form>
        </section>
      </div>
    )
  }
}

const clone = target => JSON.parse(JSON.stringify(target))