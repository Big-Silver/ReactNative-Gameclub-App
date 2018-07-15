import * as types from '../actions/types'
import createReducer from '../lib/createReducer'

export const SelectedGame = createReducer('', {
  [types.SELECT_GAME_ROOM](state, action) {
    return action.name
  },
});