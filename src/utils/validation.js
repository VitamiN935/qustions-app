import is from 'is_js'

export function checkValidForm(formControls, isValidForm = true) {
  return Object.keys(formControls).every(controlName => {
    return formControls[controlName].valid;
  }) && isValidForm
}

export function checkValidControl(value, validation = null) {
  if (!validation) return true;

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid = is.email(value) && isValid
  }

  if (validation.minLength) {
    isValid = value.trim().length >= validation.minLength && isValid
  }

  return isValid
}