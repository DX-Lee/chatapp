const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OfflineSchema = new mongoose.Schema({
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: Schema.Types.Mixed
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
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

module.exports = mongoose.model('OfflineMessage', OfflineSchema)