import * as types from './mutation-type'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_POSTLIST] (state, list) {
    state.postList = list
  },
  [types.SET_SESSIONLIST] (state, list) {
    state.sessionList = list
  },
  [types.SET_PERSONLIST] (state, list) {
    state.personList = list
  }
}
export default mutations
