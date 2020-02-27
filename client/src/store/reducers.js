import { combineReducers } from "redux";
import { errorsReducer } from "./errors/reducers";
import { userReducer } from './user/reducers'


export default combineReducers({
  user: userReducer,
  errors: errorsReducer
})
