import service from '_u/service'

export const accountLogin = (userInfo) => {
  return service.post('login/accountLogin', userInfo)
}

export const accountRegister = (userInfo) => {
  return service.post('login/accountRegister', userInfo)
}

export const queryAccount = (account) => {
  return service.get('login/queryAccount', { account })
}

export const querySessionList = () => {
  return service.get('chat/querySessionList')
}

export const queryPersonList = () => {
  return service.get('user/queryPersonList')
}

export const pullNewMessage = (data) => {
  return service.get('chat/pullNewMessage', data)
}
export const sendChatMessage = (chatData) => {
  return service.post('chat/sendChatMessage', chatData)
}
export const queryPostList = (option = {}) => {
  return service.get('post/getPostList', option)
}

export const publishPost = (postData) => {
  return service.post('post/publishPost', postData)
}
