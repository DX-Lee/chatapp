const express = require('express');
const router = express.Router();
const tokenUtil = require('../util/token')
const {
  checkAccountAndPassord,
  createUser,
  checkAccountIsExist
} = require('../util/user')

// 登陆路由
router.post('/accountLogin', async (req, res, next) => {
  // console.log(req.headers)
  const user = await checkAccountAndPassord(req.body)
  if (user) {
    tokenUtil.setToken({user, res})
    res.json({
      code: 200,
      result: user,
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

// 查询账号是否已经存在
router.get('/queryAccount', async (req, res, next) => {
  const ret = await checkAccountIsExist(req.query.account)
  if (ret) {
    res.json({
      code: 400,
      result: -1,
      message: '已存在用户名'
    })
  } else {
    res.json({
      code: 200,
      result: {}
    })
  }
})
// 注册路由
router.post('/accountRegister', async (req, res, next) => {
    const user = await createUser(req.body)
    tokenUtil.setToken({user, res})
    res.json({
      code: 200,
      result: user,
      message: '注册成功'
    })
})
module.exports = router;
