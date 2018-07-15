import * as types from './types'
import * as firebase from "firebase";
const Database = require('../model/Database');
const {
    ListView
} = require('react-native')

export const loadPosts = (obj, ds) => {
    return (dispatch, getState) => {
        obj.mounted = true;
        Database.getGamePosts((Data) => {
            if(obj.mounted){
                var Posts = [];
                Object.keys(Data).map(function (key) {  
                    Posts.push(Data[key]);
                    obj.setState({ dataSource: ds.cloneWithRows(Posts)});
                });
                obj.setState({loading: false});
                if(Object.keys(Posts).length == 0) obj.setState({isEmpty: true});
                else obj.setState({isEmpty: false});
                dispatch(showPosts(Posts))
            }
      });

    }
    
}

export const showPosts = (Data) => {
    return {
        type: types.ALL_POSTS,
        Data
    }
}