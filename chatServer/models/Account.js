const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new mongoose.Schema({
  account: String, // 账号
  password: String, // 密码
  salt: String, // 加密字符串
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  create: {type: Date, default: Date.now},
  update: {type: Date, default: Date.now}
}, {timestamps: {createdAt: 'create', updatedAt: 'update'}})

module.exports = mongoose.model('Account', AccountSchema)
