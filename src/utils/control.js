export function createControl(config, validation = null) {
  return {
    value: '',
    ...config,
    touched: false,
    valid: !validation,
    validation
  }
}

