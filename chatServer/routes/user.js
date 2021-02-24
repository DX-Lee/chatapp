const express = require('express');
const router = express.Router();
const {
  queryUserInfo,
  queryUserInfoAll,
  updateUserInfo
} = require('../util/user')

// 查询用户信息
router.get('/queryUserInfo', async (req, res, next) => {
  const account = req.query.account
  try {
    const user = await queryUserInfo(account)
    if (user) {
      res.json({
        code: 200,
        result: user
      })
    } else {
      res.json({
        code: 404,
        result: -1,
        message: '该用户不存在'
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

// 查询所有用户信息
router.get('/queryPersonList', async (req, res, next) => {
  try {
    const userId = req.user._id
    const list = await queryUserInfoAll()
    const result = JSON.parse(JSON.stringify(list)).filter(item => item._id !== userId)
    res.json({
      code: 200,
      result: result
    })
  } catch (error) {
    res.json({
      code: 400,
      result: -1
    })
  }
})
// 编辑用户信息
router.post('/updateInformation', async (req, res, next) => {
  try {
    const userId = req.user._id
    const data = req.body.data
    const result = await updateUserInfo(userId, data)
    res.json({
      code: 200,
      result
    })
  } catch (e) {
    console.log(e)
    res.json({
      code: 400,
      result: -1
    })
  }
})
module.exports = router;
