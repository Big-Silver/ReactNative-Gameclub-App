import * as loginActions from './login'
import * as homeActions from './home'
import * as signupActions from './signup'
import * as postlistActions from './postlist'

export const ActionCreators = Object.assign({},
  loginActions,
  homeActions,
  signupActions,
  postlistActions
);
