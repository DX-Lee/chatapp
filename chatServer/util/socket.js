const Session = require('../models/Session')
/**
 * 存储用户池
 */
const socketPoll = {}
module.exports = {
  setSocket(socket) {
    socket.on('login', (user) => {
      console.log('用户' + user._id + '进入聊天')
      socketPoll[user._id] = socket
    })

    socket.on('loginout', (user) => {
      console.log('用户' + user._id + '离开聊天')
      delete socketPoll[user._id]
    })

    socket.on('update', (user) => {
      console.log('update')
      socketPoll[user._id] = socket
      console.log(socketPoll)
    })
    // 消息确认
    socket.on('ackMessage', (data) => {
      const {
        chatId,
        user
      } = data
      console.log('ack')
      Session.updateOne({chatId, user}, {newMsgCount: 0}).exec()
    })
    
    socket.on('disconnect', (reason) => {
      console.log('断开连接')
      console.log(reason)
    })
  },
  sendMessage (option) {
    const {
      id,
      event,
      data
    } = option
    const currentSocket = socketPoll[id]
    console.log('向客户端发送消息')
    console.log(socketPoll)
    if (currentSocket) {
      currentSocket.emit(event, data)
    }
    console.log(event)
  }
}