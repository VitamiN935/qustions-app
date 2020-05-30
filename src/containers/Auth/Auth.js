import React, {Component} from 'react'
import classes from  './Auth.module.scss'
import ButtonS from "../../components/UI/ButtonStatic/ButtonS";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'

export default class Auth extends Component {

  state = {
    isValidForm: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        text: 'Email',
        errorMessage: 'Укажите корректный email',
        valid: false,
        touched: false,
        validator: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        text: 'Пароль',
        errorMessage: 'Недасточно символов',
        valid: false,
        touched: false,
        validator: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  onSubmit = e => e.preventDefault()
  onLoginHandle = () => {
    console.log('Login handle')
  }
  onRegisterHandle = () => {}

  isValid = (value, validator = null) => {
    if (!validator) return true;
    let valid = true;

    if(validator.required) {
      valid = value.trim() !== '' && valid
    }

    if(validator.email) {
      valid = is.email(value) && valid
    }

    if(validator.minLength) {
      valid = value.trim().length >= validator.minLength && valid;
    }

    return  valid;
  }

  changeControlHandle = (value, controlName) => {
    const formControls = clone(this.state.formControls);
    const control = formControls[controlName];
    let isValidForm = true;

    control.value = value;
    control.touched = true
    control.valid = this.isValid(control.value, control.validator);

    isValidForm = Object.keys(formControls).every(controlName => {
      return formControls[controlName].valid
    }) && isValidForm

    this.setState({formControls, isValidForm})
  }

  getAllControls = () => {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={idx}
          {...control}
          shouldValidate={!!control.validator}
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