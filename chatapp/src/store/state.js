import storage from '_u/storage'
const state = {
  user: storage.read('userInfo') || {},
  postList: storage.read('postList') || [],
  sessionList: storage.read('sessionList') || [],
  personList: storage.read('personList') || []
}
export default state
