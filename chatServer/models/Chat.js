const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new mongoose.Schema({
  params: {
    type: Schema.Types.Mixed
  }, // 聊天相关参数
  isDel: {
    type: Boolean,
    required: true,
    default: false
  }, // 是否删除
  lastMsgTime: {
    type: Date,
    default: Date.now
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // 聊天发起者
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // 聊天接收者
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
module.exports = mongoose.model('Chat', ChatSchema)