const mongoose = require('mongoose')
const { schema } = require('./User')
const Schema = mongoose.Schema

const MessageSchema = new mongoose.Schema({
  content: {
    type: Schema.Types.Mixed
  }, // 聊天内容
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  }, // 关联聊天ID
  create: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: {
    createdAt: 'create',
    updatedAt: 'update'
  }
})
module.exports = mongoose.model('Message', MessageSchema)