import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const Email = createReducer('', {
  [types.INPUTED_EMAIL](state, action) {
    return action.email
  },
  [types.SAVED_EMAIL](state, action) {
    return action.email
  },
  
});



export const Password = createReducer('', {
  [types.INPUTED_PASSWORD](state, action) {
    return action.password
  },
});

export const Username = createReducer('', {
  [types.MY_USERNAME](state, action) {
    return action.username
  },
});



