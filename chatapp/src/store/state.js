import storage from '_u/storage'
const state = {
  user: storage.get('user') || {},
  postList: []
}
export default state
