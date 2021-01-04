import * as types from './mutation-type'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_POSTLIST] (state, list) {
    state.postList = list
  }
}
export default mutations
