const Chat = require('../models/Chat')
const Session = require('../models/Session')
const Message = require('../models/Message')
 
/**
 * 
 * 清除已读消息
 */
const pullNewMessage = async (data) => {
  const {
    fromUser,
    toUser,
    count
  } = data
  const session = await Session.findOne({
    user: fromUser,
    friend: toUser
  })
  Session.findByIdAndUpdate(session._id, {
    newMsgCount: 0
  }).exec()
  const list = await Message.find({
    fromUser: toUser,
    toUser: fromUser
  }).limit(count * 1).populate('fromUser').populate('toUser').sort({'create': -1}).exec()
  const result = []
  for (let i = list.length - 1; i >= 0; i--) {
    const msg = JSON.parse(JSON.stringify(list[i]))
    if (fromUser == msg.fromUser._id) {
      msg.isMine = true
    } else {
      msg.isMine = false
    }
    result.push(msg)
  }
  return result
}

// 创建一条聊天记录
const createChatMessage = async (data) => {
  const {
    fromUser,
    toUser,
    content
  } = data
  let chatId = ''
  let mySession
  let friendSession
  // 先查询是否已存在聊天
  const list = await Chat.find({
    $or: [
      {
        $and: [{user: fromUser}, {anotherUser: toUser}]
      },
      {
        $and: [{anotherUser: fromUser}, {user: toUser}]
      }
    ]
  })
  if (list.length) {
    chatId = list[0]._id
    mySession = await Session.findOne({chatId, user: fromUser})
    friendSession = await Session.findOne({chatId, user: toUser})
  } else {
    // 如果之前不存在聊天则新建一个聊天
    const chat = await Chat.create({
      user: fromUser,
      anotherUser: toUser
    })
    chatId = chat._id
    // 同时创建会话
    mySession = await Session.create({
      chatId,
      user: fromUser,
      friend: toUser
    })
    friendSession = await Session.create({
      chatId,
      user: toUser,
      friend: fromUser
    })
  }
  // 创建新消息
  const message = await Message.create({
    fromUser,
    toUser,
    content,
    chatId
  })
  // 更新会话信息
  Session.updateOne({_id: mySession._id}, {
    lastMsgTime: message.create,
    lastMessage: content
  }).exec()
  Session.updateOne({_id: friendSession._id}, {
    lastMsgTime: message.create,
    lastMessage: content,
    newMsgCount: friendSession.newMsgCount + 1
  }).exec()
  return message
}
// 获取聊天列表
const querySessionList = async (user) => {
  const list = await Session.find({
    user
  }).populate('user').populate('friend').sort({'lastMsgTime': -1}).exec()
  const result = []
  for (let i = 0; i < list.length; i++) {
    const chat = JSON.parse(JSON.stringify(list[i]))
    if (!chat.isDel) {
      result.push(chat)
    }
  }
  return result
}
/**
 * 查询最新一条消息
 */
async function queryLastMessageById (id) {
  const list = await Message.find({
    chatId: id
  }).sort({'create': -1}).exec()
  return list[0] || ''
}
/**
 * 删除聊天会话
 */
async function deleteSession (data) {
  const {
    chatId,
    userId
  } = data
  return Session.findOneAndUpdate({chatId, user: userId}, {isDel: true}).exec()
}
module.exports = {
  pullNewMessage,
  createChatMessage,
  querySessionList,
  deleteSession
}