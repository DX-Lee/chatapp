const User = require('../models/User')
module.exports = {
  // 用于登陆 检查用户名和密码是否真正确
  checkUser (data, islogin = false) {
    return User.findOne({account: data.account, password: data.password}).exec()
  },
  // 用于注册 检查用户名是否已经存在
  checkSameName (data) {
    return User.findOne({account: data.account}).exec()
  },
  // 查询用户信息
  getUserInfo (name) {
    return User.findOne({account: name}).exec()
  }
}