import service from '_u/service'
import storage from '_u/storage'
import {
  accountLogin,
  accountRegister
} from '@/config/request'
import {
  formatChatListTime,
  formatTime
} from '_u/formatTime'
// 格式化会话列表
function formatSessionList (list) {
  return list.map((item) => {
    return {
      personInfo: item.friend,
      lastMessage: item.lastMessage,
      lastMsgTime: formatChatListTime(new Date(item.lastMsgTime).getTime()),
      chatId: item.chatId,
      newMsgCount: item.newMsgCount
    }
  })
}

// 格式化动态列表
function formatData (data) {
  const ret = []
  data.forEach((item) => {
    ret.push({
      id: item._id,
      nickname: item.user.nickname,
      avatar: item.user.avatar,
      content: item.content,
      picList: item.picList,
      likeList: item.likeList,
      comments: item.comments,
      isLike: item.isLike,
      userInfo: item.user,
      time: formatTime(new Date(item.create).getTime())
    })
  })
  return ret
}
const actions = {
  // 登录
  onLogin ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      accountLogin(userInfo).then(res => {
        const result = res.result
        if (res.code === 200) {
          commit('SET_USER', result)
          storage.setAccount(result)
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
      accountRegister(data).then(res => {
        const result = res.result
        if (res.code === 200) {
          commit('SET_USER', result)
          storage.setAccount(result)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取消息列表
  querySessionList ({ commit }) {
    return new Promise((resolve, reject) => {
      service.get('chat/querySessionList').then(res => {
        if (res.code === 200) {
          const list = formatSessionList(res.result)
          commit('SET_SESSIONLIST', list)
          storage.write('sessionList', list)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 删除聊天

  deleteSession ({ commit, state }, option) {
    return new Promise((resolve, reject) => {
      const {
        index,
        chatId
      } = option
      service.post('chat/deleteSession', { chatId }).then(res => {
        if (res.code === 200) {
          const sessionList = [...state.sessionList]
          sessionList.splice(index, 1)
          commit('SET_SESSIONLIST', sessionList)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取所有用户列表
  queryPersonList ({ commit }) {
    return new Promise((resolve, reject) => {
      service.get('user/queryPersonList').then(res => {
        if (res.code === 200) {
          commit('SET_PERSONLIST', res.result)
          storage.write('personList', res.result)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取动态列表
  queryPostList ({ commit, state }, options) {
    return new Promise((resolve, reject) => {
      service.get('post/getPostList', options).then(res => {
        if (res.code === 200) {
          const list = formatData(res.result)
          if (options.pageStart === 0) {
            // 下拉刷新
            commit('SET_POSTLIST', list)
            storage.write('postList', list)
          } else {
            const postList = [...state.postList].concat(list)
            commit('SET_POSTLIST', postList)
            storage.write('postList', postList)
          }
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
        if (res.code === 200) {
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新用户信息
  updateUserInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      service.post('user/updateInformation', data).then(res => {
        if (res.code === 200) {
          commit('SET_USER', res.result)
          storage.write('userInfo', res.result)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default actions
