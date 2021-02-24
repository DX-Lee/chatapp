const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const sizeOf = require('image-size') // 计算图片大小

const {
  createPost,
  createLike,
  removeLike,
  createComment,
  queryPostList,
  queryLikesByPost,
  queryCommentsByPost,
  checkPostIsLike
} = require('../util/post')
// 先本地保存图片，上传后删除
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'../public/upload/'))
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + extname)
  }
})
let upload = multer({ storage: storage})

// 阿里云上传图片
const OSS = require('ali-oss')
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'abc',
  accessKeySecret: 'abc',
  bucket: 'justchat'
})

router.post('/uploadImgAliyun', upload.single('image'), async (req, res, next) => {
  let file = req.file
  let demensions = sizeOf(file.path);
  try {
    let result = await client.put(file.filename, file.path)
    res.json({
      code: 200,
      result: {
        url: result.url,
        size: demensions
      }
    })
  } catch (e) {
    console.log(e)
    res.json({
      code: 400,
      result: -1
    })
  }
  // 删除暂时的图片
  fs.unlinkSync(file.path)
})

router.post('/deleteImgAliyun', async (req, res, next) => {
  let filename = req.body.filename
  try {
    let result = await client.delete(filename)
    res.json({
      code: 200,
      result
    })
  } catch (error) {
    console.log(error)
    res.json({
      code: 400,
      result: -1
    })
  }
})
// 保存提交的动态
router.post('/publishPost', async (req, res, next) => {
  const postData = {
    content: req.body.content || '',
    picList:req.body.picList || [],
    user: req.user._id
  }
  try {
    const result = await createPost(postData)
    res.json({
      code: 200,
      result
    })
  } catch (e){
    console.log(e)
    res.json({
      code: 400,
      result: -1
    })
  }
})
// 点赞
router.post('/addLike', async (req, res, next) => {
  try {
    const result = await createLike({
      post: req.body.postId,
      user: req.user._id
    })
    res.json({
      code: 200,
      result
    })
  } catch (e) {
    res.json({
      code: 400,
      result: -1
    })
  }
})
// 取消点赞
router.post('/cancelLike', async (req, res, next) => {
  try {
    const result = await removeLike({
      post: req.body.postId,
      user: req.user._id
    })
    res.json({
      code: 200,
      result
    })
  } catch (e) {
    res.json({
      code: 400,
      result: -1
    })
  }
})

// 评论
router.post('/addComment', async (req, res, next) => {
  try {
    const result = await createComment({
      post: req.body.postId,
      user: req.user._id,
      content: req.body.content
    })
    res.json({
      code: 200,
      result
    })
  } catch (error) {
    res.json({
      code: 400,
      result: -1
    })
  }
})

// 获取post列表
router.get('/getPostList', async (req, res, next) => {
  const option = {
    pageStart: parseInt(req.query.pageStart),
    pageSize: parseInt(req.query.pageSize)
  }
  try {
    const postList = await queryPostList(option)
    const result = []
    // 根据post查询comment like
    for (let i = 0; i < postList.length; i++) {
      const comments = await queryCommentsByPost(postList[i])
      const likeList = await queryLikesByPost(postList[i])
      const post = JSON.parse(JSON.stringify(postList[i]))
      post.comments = comments || []
      post.likeList = likeList || []
      post.isLike = checkPostIsLike(likeList, req.user)
      result.push(post)
    }
    res.json({
      code: 200,
      result
    })
  } catch (error) {
    console.log(error)
    res.json({
      code: 400,
      result: -1
    })
  }
})

module.exports = router