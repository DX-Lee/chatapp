const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LikeSchema = new mongoose.Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
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
}, {timestamps: {createdAt: 'create', updatedAt: 'update'}})

LikeSchema.index({user: 1, post: 1}, {unique: true})

module.exports = mongoose.model('Like', LikeSchema)