const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new mongoose.Schema({
  content: String,
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

module.exports = mongoose.model('Comment', CommentSchema)