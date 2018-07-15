import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const UsernameList = createReducer([],{
    [types.USERNAME_LIST](state, action){
        return action.Data;
    }
})
