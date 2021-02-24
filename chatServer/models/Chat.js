const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  anotherUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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