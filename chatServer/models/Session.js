const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new mongoose.Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isDel: {
    type: Boolean,
    default: false
  },
  lastMsgTime: {
    type: Date,
    default: Date.now
  },
  newMsgCount: {
    type: Number,
    default: 0
  },
  lastMessage: {
    type: String
  },
  create: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'create',
    updatedAt: 'update'
  }
})

module.exports = mongoose.model('Session', SessionSchema)