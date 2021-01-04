const express = require('express')
const router = express.Router()
const Chat = require('../models/Chat')
const Message = require('../models/Message')
const User = require('../models/User')

// 将消息存到数据库
async function saveMsg (from,to,message) {
  let chatId = ''
  // 查询是否存在聊天
  let list = await Chat.find({
    $or: [
      {
        $and: [{fromUser: from}, {toUser: to}]
      },
      {
        $and: [{fromUser: to}, {toUser, from}]
      }
    ]
  })
  // 如果没有则创建一个新的聊天
  if (list.length) {
    chatId = list[0]._id
  } else {
    let chat = await Chat.create({
      fromUser: from,
      toUser: to
    })
    chatId = chat._id
  }

  // 新增消息
  let result = await Message.create({
    fromUser: from,
    toUser: to,
    content: message,
    chatId: chatId
  })

  // 更新chat 的最新消息时间
  Chat.findByIdAndUpdate(chatId, {
    lastMsgTime: result.create
  })
  return result
}

// 根据chatId查询聊天消息
async function getMsgByChatId (chatId, key) {
  // 根据搜索关键字查询
  let list = []
  if (key) {
    let reg = new RegExp(key, 'i')
    list = await Message.find({
      chatId: chatId,
      'content.type': 'text',
      'content.value': {
        $regex: reg
      }
    })
  } else {
    list = await Message.find({
      chatId: chatId
    }).sort({'create': -1}).exec()
  }
  return list[0] || ''
}


// 获得历史聊天记录
router.get('/getChatHistory', async (req, res, next) => {
  try {
    let fromUser = req.user._id
    let toUser = req.query.toUser
    let list = await Message.find({
      $or: [
        {$and: [{fromUser: fromUser}, {toUser, toUser}]},
        {$and: [{fromUser: toUser}, {toUser: fromUser}]}
      ]
    }).populate('fromUser').sort({'create': 1}).exec()
    const result = []
    for (let i = 0; i < list.length; i++) {
      let msg = JSON.parse(JSON.stringify(list[i]))
      // 判断消息的发送方是否为当前用户
      if (fromUser === msg.fromUser._id) {
        msg.mine = true
      } else {
        msg.mine = false
      }
      result.push(msg)
    }
    res.json({
      code: 200,
      result
    }) 
  } catch (error) {
    console.log(error)
    res.json({
      code: 400,
      result: -1
    })
  }
})
// 发送消息
router.post('/sendMsg', async (req, res, next) => {
  try {
    let fromUser = req.user._id
    let toUser = req.body.toUser
    let content = req.body.content
    let result = await saveMsg(fromUser, toUser, content)
    res.json({
      code: 200,
      result
    })
  } catch (error) {
    res.json({
      code: 400,
      result: -1
    })
  }
})
// 获取聊天列表
router.get('/getChatList', async (req, res, next) => {
  try {
    let fromUser = req.user._id
    let list = await Chat.find({
      $or: [
        {fromUser: fromUser},
        {toUser: fromUser}
      ]
    }).populate('fromUser').populate('toUser').sort({'lastMsgTime': -1}).exec()
    let result = []
    for (let i = 0; i < list.length; i++) {
      let chat = JSON.parse(JSON.stringify(list[i]))
      chat.msg = await getMsgByChatId(chat._id)
      result.push(chat)
    }
    res.json({
      code: 200,
      result
    })
  } catch (error) {
    res.json({
      code: 400,
      result: -1
    })
  }
})

module.exports = router