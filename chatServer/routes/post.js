const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const sizeOf = require('image-size') // 计算图片大小

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Like = require('../models/Like')
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
router.post('/uploadImgAliyun', upload.single('image'), async function(req, res, next) {
  const OSS = require('ali-oss')
  const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4G9CA6RrzJFc2fWHoVDT',
    accessKeySecret: 'I1ayLmhLDux9eFBqlz9kGrDIkwoue2',
    bucket: 'justchat'
  })
  let file = req.file
  let demensions = sizeOf(file.path);
  let result = await client.put(file.filename, file.path)
  console.log(result)
  res.json({
    code: 200,
    result: {
      url: result.url,
      size: demensions
    }
  })
  // 删除暂时的图片
  fs.unlinkSync(file.path)
})

// 保存提交的动态
router.post('/publishPost', async function (req, res, next) {
  let userId = req.user._id
  let postData = {
    content: req.body.content,
    picList:req.body.picList,
    user: userId
  }
  try {
    let result = await Post.create(postData)
    res.json({
      code: 0,
      result
    })
  } catch (e){
    res.json({
      code: 400,
      result: -1
    })
  }
})
// 点赞
router.post('/addLike', async function (req, res, next) {
  let postId = req.body.postId
  let userId = req.user._id
  try {
    let result = await Like.create({
      post: postId,
      user: userId
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
router.post('/cancelLike', async function (req, res, next) {
  let postId = req.body.postId
  let userId = req.user._id
  try {
    let result = await Like.deleteOne({
      post: postId,
      user: userId
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
router.post('/addComment', async function (req, res, next) {
  let postId = req.body.postId
  let userId = req.user._id
  let content = req.body.content
  try {
    let result = await Comment.create({
      post: postId,
      user: userId,
      content
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

// 获取post数据
router.get('/getPostList', async function (req, res, next) {
  // 分页数据大小
  let pageSize = 5
  //  获取起始索引
  let pageStart = req.query.pageStart || 0
  console.log(req.query)
  let posts = await Post.find()
  .skip(pageSize * pageStart)
  .limit(pageSize)
  .populate('user')
  .sort({
    'create': -1
  }).exec()
  let result = []
  // 根据post查询comment like
  for (let i = 0; i<posts.length; i++) {
    let comments = await getCommentsByPost(posts[i])
    let likeList = await getLikesByPost(posts[i])

    let post = JSON.parse(JSON.stringify(posts[i]))
    post.comments = comments || []
    post.likeList = likeList || []
    post.isLike = checkPostIsLike(likeList, req.user)
    result.push(post)
  }
  res.json({
    code: 200,
    result
  })
})
// 根据post查询comment
function getCommentsByPost (post) {
  return Comment.find({post: post._id}).populate('user').sort({'create': 1}).exec()
}

// 根据post查询like
function getLikesByPost (post) {
  return Like.find({post: post._id}).populate('user').sort({'create': 1}).exec()
}

// 查询post 是否被当前用户点赞过
function checkPostIsLike (likeList, user) {
  if (!user) {
    return false
  }
  for (let i = 0; i < likeList.length; i++) {
    if (likeList[i].user._id == user._id) {
      return true
    }
  }
  return false
}
module.exports = router