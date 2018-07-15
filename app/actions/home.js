import * as types from './types'


export const selectRoom = (name) => {
  return {
    type: types.SELECT_GAME_ROOM,
    name: name.split(".")[0]
  }
}
