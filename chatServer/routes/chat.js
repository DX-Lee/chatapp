const express = require('express')
const router = express.Router()
const socket = require('../util/socket')
const {
  pullNewMessage,
  createChatMessage,
  querySessionList,
  deleteSession
} = require('../util/chat')

// 获得历史聊天记录
router.get('/pullNewMessage', async (req, res, next) => {
  try {
    const data = {
      fromUser: req.user._id,
      toUser: req.query.toUser,
      count: req.query.count
    }
    const result = await pullNewMessage(data)
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
router.post('/sendChatMessage', async (req, res, next) => {
  try {
    const data = {
      fromUser: req.user._id,
      toUser: req.body.toUser,
      content: req.body.content
    }
    const result = await createChatMessage(data)
    socket.sendMessage({
      id: req.body.toUser,
      event: 'receiveMessage',
      data: {
        chatId: result.chatId,
        content: req.body.content,
        fromUser: req.user,
        create: result.create,
        id: result._id
      }
    })
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
// 获取聊天列表
router.get('/querySessionList', async (req, res, next) => {
  try {
    const result = await querySessionList(req.user._id)
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
// 删除聊天会话
router.post('/deleteSession', async (req, res, next) => {
  try {
    const session = await deleteSession({
      chatId: req.body.chatId,
      userId: req.user._id
    })
    if (session) {
      res.jsonp({
        code: 200,
        result: session
      })
    } else {
      res.jsonp({
        code: 404,
        result: -1
      })
    }
  } catch (error) {
    res.jsonp({
      code: 400,
      result: -1
    })
  }
})
module.exports = router