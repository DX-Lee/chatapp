const User = require('../models/User')
const Account = require('../models/Account')
const OfflineMessage = require('../models/OfflineMessage')
const config = require('../config')
// 用于登陆 检查用户名和密码是否真正确
const checkAccountAndPassord = async (data) => {
  const accountInfo = await Account.findOne(data).exec()
  if (accountInfo) {
    return User.findOne({account: accountInfo.account}).exec()
  } else {
    return null
  }
}
// 创建一个新用户
const createUser = async (data) => {
  const {
    account,
    password
  } = data
  const nickname = '用户' + account
  const avatar = config.uploadPath + `/avatar${Math.floor(Math.random()*4 + 1)}.png`
  const gender = '1'
  const user = await User.create({
    nickname,
    account,
    avatar,
    gender
  })
  Account.create({
    account,
    password,
    user: user._id
  })
  OfflineMessage.create({
    user: user._id
  })
  return user
}

// 检查账号是否已经存在
const checkAccountIsExist = (account) => {
  return Account.findOne({account}).exec()
}
// 查询用户信息
const queryUserInfo = (account) => {
  return User.findOne({account}).exec()
}
// 查询所有用户信息
const queryUserInfoAll = () => {
  return User.find().exec()
}
// 更新用户信息
const updateUserInfo = (userId, data) => {
  // 返回更新后的数据
  return User.findByIdAndUpdate(userId, data , { new: true}).exec()
}
module.exports = {
  checkAccountAndPassord,
  createUser,
  checkAccountIsExist,
  queryUserInfo,
  queryUserInfoAll,
  updateUserInfo
}