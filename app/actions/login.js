import * as types from './types'
import Storage from 'react-native-storage';
import * as firebase from "firebase";
import { AsyncStorage } from 'react-native';
import {Actions} from 'react-native-router-flux';
const Database = require('../model/Database');
var Global = require('../Global');
firebase.initializeApp({
    apiKey: "AIzaSyB0_RtBbaxaZbt4SRLgjpQJV97zIZslkPQ",
    authDomain: "gameclub-15c6c.firebaseapp.com",
    databaseURL: "https://gameclub-15c6c.firebaseio.com",
    storageBucket: "gameclub-15c6c.appspot.com",
    messagingSenderId: "166488005093"
});

var storage = new Storage({
    // maximum capacity, default 1000  
    size: 1000,
 
    // Use AsyncStorage for RN, or window.localStorage for web. 
    // If not set, data would be lost after reload. 
    storageBackend: AsyncStorage,
    
    // expire time, default 1 day(1000 * 3600 * 24 milliseconds). 
    // can be null, which means never expire. 
    defaultExpires: 1000 * 3600 * 24,
    
    // cache data in the memory. default is true. 
    enableCache: true,
    
    // if data was not found in storage or expired, 
    // the corresponding sync method will be invoked and return  
    // the latest data. 
    sync : {
        // we'll talk about the details later. 
    }
})	


export const setSavedEmail = (email) => {
    return {
        type: types.SAVED_EMAIL,
        email: email
    }
}

export const onEmail = (email) => {
    return {
        type: types.INPUTED_EMAIL,
        email: email
    }
}

export const onPassword = (pass) => {
    return {
        type: types.INPUTED_PASSWORD,
        password: pass
    }
}

export const onLoginSuccess = () => {
    return {
        type: types.LOGIN_SUCCESS,
    }
}

export const initEmail = (obj) => {

  return (dispatch, getState) => {
        storage.load({
            key: 'currentUser',
        }).then(ret => {
            console.log(ret.userid);
            obj.setState({email: ret.email})
            dispatch(setSavedEmail(ret.email))
            
        }).catch(err => {
            
            switch (err.name) {
                case 'NotFoundError':
                    // TODO; 
                    break;
                case 'ExpiredError':
                    // TODO 
                    break;
            }
        });
      
  }
        
}

export const setUserName = (un) => {
    return {
        type: types.MY_USERNAME,
        username: un
    }
}

export const onLogin = (email, pass, user, obj) => {
    return (dispatch, getState) => {

            dispatch(onEmail(email))
            dispatch(onPassword(pass))
            dispatch(onLoginSuccess())

            Database.listenUserDetails((Data) => {
                var un = Data[user.uid].details.username;
                dispatch(setUserName(un))
                Global.myUsername = un;
                Global.myEmail = email;
                storage.save({
                    key: 'currentUser',   // Note: Do not use underscore("_") in key! 
                    rawData: {
                        email: email,
                        username: un
                    },
                    
                    // if not specified, the defaultExpires will be applied instead. 
                    // if set to null, then it will never expire. 
                    expires: null
                }); 
                Actions.home();
                obj.setState({isLoading: false})
                
            }) 
        
    }
    

}

