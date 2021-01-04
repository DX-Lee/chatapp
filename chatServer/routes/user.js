const express = require('express');
const router = express.Router();
const User = require('../models/User')
const config = require('../config')
const tokenUtil = require('../util/token')
const {
  checkUser,
  checkSameName,
  getUserInfo
} = require('../util/user')
/* GET users listing. */
function createUser (data) {
  const nickname = '用户' + Date.now()
  const account = data.account
  const password = data.password
  const avatar = config.uploadPath + `/avatar${Math.floor(Math.random()*4 + 1)}.png`
  const gender = '1'
  return User.create({
    nickname,
    account,
    password,
    avatar,
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

// 登陆路由
router.post('/login', async function(req, res, next) {
  // console.log(req.headers)
  let user = await checkUser(req.body)
  console.log(user)
  if (user) {
    tokenUtil.setToken({user, res})
    res.json({
      code: 200,
      result: restObj(user,['password']),
      message: '登陆成功'
    })
  } else {
    res.json({
      code: 400,
      result: -1,
      message: '登陆失败'
    })
  }
});
// 注册路由
router.post('/register', async function (req, res, next) {
  let ret = await checkSameName(req.body)
  if (ret) {
    res.json({
      code: 400,
      result: -1,
      message: '已存在用户名'
    })
  } else {
    const user = await createUser(req.body)
    tokenUtil.setToken({user, res})
    res.json({
      code: 200,
      result: restObj(user,['password']),
      message: '注册成功'
    })
  }
})
router.get('/queryUserInfo', async (req, res, next) => {
  let account = req.query.account
  try {
    let user = await getUserInfo(account)
    if (user) {
      res.json({
        code: 200,
        result: restObj(user, ['password'])
      })
    } else {
      res.json({
        code: 404,
        result: -1,
        message: '你查找的用户不存在'
      })
    }
  } catch (error) {
    res.json({
      code: 500,
      result: -1,
      message: '服务器出错'
    })
  }
})
// router.post('/addFriend', async (req, res, next) => {

// })
module.exports = router;
