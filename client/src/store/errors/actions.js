export const ADD_LOGIN_ERRORS = 'ADD_LOGIN_ERRORS'
export const ADD_REGISTRATION_ERRORS = 'ADD_REGISTRATION_ERRORS'

export const addLoginErrors = errors => ({
  type: ADD_LOGIN_ERRORS,
  errors
})

export const addRegistrationErrors = errors => ({
  type: ADD_REGISTRATION_ERRORS,
  errors
})
