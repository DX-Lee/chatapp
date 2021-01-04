import store from 'store'

const storage = {
  get (key) {
    return store.get(key)
  },
  set (key, data) {
    return store.set(key, data)
  },
  remove (key) {
    return store.remove(key)
  },
  clear () {
    return store.clearAll()
  }
}
export default storage
