import { combineReducers } from 'redux';
import * as homeReducer from './home'
import * as loginReducer from './login'
import * as signupReducer from './signup'
import * as postlistReducer from './postlist'

export default combineReducers(Object.assign(
  homeReducer,
  loginReducer,
  signupReducer,
  postlistReducer
));
