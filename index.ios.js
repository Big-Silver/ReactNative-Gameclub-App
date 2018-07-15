import React, {Component} from 'react'
import {Router, Scene} from 'react-native-router-flux'
import {Provider, connect} from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './app/reducers'
import Login from './app/containers/login'
import Home from './app/containers/home'
import SignUp from './app/containers/signup'
import Postlist from './app/containers/postlist'
import Postview from './app/containers/postview'
const RouterWithRedux = connect()(Router)
const {
  AppRegistry
} = require('react-native')
// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class GameClubRedux extends Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='login' component={Login} title='Login Page'  hideNavBar={true}/>
          <Scene key='home' component={Home} title='Home Page'  hideNavBar={true}/>
          <Scene key='signup' component={SignUp} title='SignUp Page' hideNavBar={true} />
          <Scene key='postlist' component={Postlist} title='PostList Page' hideNavBar={true} />
          <Scene key='postview' component={Postview} title='PostView Page' hideNavBar={true} />
        </RouterWithRedux>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('GameClubRedux', () => GameClubRedux);