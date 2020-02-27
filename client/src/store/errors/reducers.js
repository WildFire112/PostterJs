import { ADD_LOGIN_ERRORS, ADD_REGISTRATION_ERRORS } from './actions'

const defaultState = {
  registrationErrors: {},
  loginErrors: {}
}

export const errorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_LOGIN_ERRORS:
      return {
        loginErrors: action.errors
      }
    case ADD_REGISTRATION_ERRORS:
      return {
        registrationErrors: action.errors
      }

    default: return state
  }
}
