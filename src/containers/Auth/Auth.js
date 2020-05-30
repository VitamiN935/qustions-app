import React, {Component} from 'react'
import classes from './Auth.module.scss'
import ButtonS from "../../components/UI/ButtonStatic/ButtonS";
import Input from "../../components/UI/Input/Input";
import {checkValidControl, checkValidForm} from "../../utils/validation";
import {createControl} from "../../utils/control";
import axios from 'axios'
import {urlSignIn, urlSignUp} from "../../other/url";
import {API_KEY} from "../../keys";

export default class Auth extends Component {

  state = {
    isValidForm: false,
    formControls: {
      email: createControl({
        type: 'email',
        text: 'Email',
        errorMessage: 'Укажите корректный email',
      }, {required: true, email: true}),
      password: createControl({
        type: 'password',
        text: 'Пароль',
        errorMessage: 'Недасточно символов',
      }, {required: true, minLength: 6})
    }
  }

  createBodyFromFb = () => {
    const {email, password} = this.state.formControls
    return {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    }
  }

  onSubmit = e => e.preventDefault()
  onLoginHandle = async () => {
    try {
      const response = await axios.post(urlSignIn + API_KEY, this.createBodyFromFb())
      console.log(response.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  onRegisterHandle = async () => {
    try {
      const response = await axios.post(urlSignUp + API_KEY, this.createBodyFromFb())
      console.log(response.data)
    } catch (e) {
      console.error(e.message)
    }
  }

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