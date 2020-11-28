const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
  content: {type: String, required: true}, // 动态内容
  picList: {type: Schema.Types.Mixed}, // 图片内容
  create: {type: Date, default: Date.now}, // 创建时间
  update: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: {createdAt: 'create', updatedAt: 'update'}})

module.exports = mongoose.model('Post', PostSchema)