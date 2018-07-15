import * as types from './types'
import {Actions} from 'react-native-router-flux'
import * as firebase from 'firebase'
const Database = require('../model/Database');



export const onload = (state) => {
    if(state){
        return {
            type: types.LOADING
        }
    }
}

export const setUsernameList = (Data) => {
    return {
        type: types.USERNAME_LIST,
        Data
    }
}

export const getUsernameList = (obj) => {
    return (dispatch, getState) => {
        firebase.auth().signInWithEmailAndPassword('Anonymous@gameclub.com', 'gameclub123')
        .then(function onSignInSuccess() {
            Database.listenUserDetails((Data) => {
                var templist = [];
                Object.keys(Data).map(function (key) {                
                    templist.push(Data[key].details.username);
                });
                obj.setState({arrayUsername: templist});
                obj.setState({loading: false});
                dispatch(setUsernameList(templist));
            });
        })
        .catch(function onSignInError() {
            console.log("Failure", arguments)
        })      
    }
}

export const onSignup = (uid, email, username) => {
    return {
        type: types.SIGNUP_SUCCESS,
        id: uid,
        email: email,
        username: username
    }
}

export const onSignupSuccess = (uid, email, username) => {
    return (dispatch, getState) => {
        dispatch(onSignup(uid, email, username))
        Actions.home();
    }
    
}
