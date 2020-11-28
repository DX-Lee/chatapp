const express = require('express');
const router = express.Router();
const User = require('../models/User')
const config = require('../config')
const tokenUtil = require('../util/token')

/* GET users listing. */
function createUser (data) {
  const nickname = '用户' + Date.now()
  const username = data.username
  const password = data.password
  const avatar = config.uploadPath + '/mavatar1.png'
  const bgUrl = config.uploadPath + '/bgImg.jpg'
  const gender = '1'
  return User.create({
    nickname,
    username,
    password,
    avatar,
    bgUrl,
    gender
  })
}
// 用来除去对象部分属性
function restObj(target, arr) {
  // target 为 document 对象,不能直接拷贝
  let ret = JSON.parse(JSON.stringify(target))
  for (let item of arr) {
    delete ret[item]
  }
  return ret
}
// 用于登陆 检查用户名和密码是否真正确
function checkUser (data, islogin = false) {
  return User.findOne({username: data.username, password: data.password}).exec()
}
// 用于注册 检查用户名是否已经存在
function checkSameName (data) {
  return User.findOne({username: data.username}).exec()
}
// 登陆路由
router.post('/login', async function(req, res, next) {
  // console.log(req.headers)
  let user = await checkUser(req.body)
  if (user) {
    tokenUtil.setToken({user, res})
    res.json({
      code: 0,
      data: restObj(user,['username','password']),
      message: '登陆成功'
    })
  } else {
    res.json({
      code: -1,
      data: {err: 401},
      message: '登陆失败'
    })
  }
});
// 注册路由
router.post('/register', async function (req, res, next) {
  let ret = await checkSameName(req.body)
  if (ret) {
    res.json({
      code: -1,
      data: {},
      message: '已存在用户名'
    })y
  } else {
    const user = await createUser(req.body)
    tokenUtil.setToken({user, res})
    res.json({
      code: 0,
      data: restObj(user,['username','password']),
      message: '注册成功'
    })
  }
})

module.exports = router;
