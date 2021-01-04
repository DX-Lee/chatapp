import service from '_u/service'
import storage from '_u/storage'
const actions = {
  // 登录
  onLogin ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      service.post('user/login', userInfo).then(res => {
        const result = res.result
        if (res.code === 200) {
          commit('SET_USER', result)
          storage.set('userInfo', result)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 注册
  onRegister ({ commit }, data) {
    return new Promise((resolve, reject) => {
      service.post('user/register', data).then(res => {
        const result = res.result
        if (res.code === 200) {
          commit('SET_USER', result)
          storage.set('userInfo', result)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取动态列表
  queryPostList ({ commit }, options) {
    return new Promise((resolve, reject) => {
      service.get('post/getPostList', options).then(res => {
        const result = res.result
        if (res.code === 200) {
          commit('SET_POSTLIST', result)
          storage.set('postList', result)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 发布动态
  publishPost ({ commit }, postData) {
    return new Promise((resolve, reject) => {
      service.post('post/publishPost', postData).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default actions
