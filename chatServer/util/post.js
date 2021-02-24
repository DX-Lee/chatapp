const Post = require('../models/Post')
const Like = require('../models/Like')
const Comment = require('../models/Comment')
// 新建一条动态
const createPost = (postData) => {
  return Post.create(postData)
}
// 给动态点赞
const createLike = (data) => {
  return Like.create(data)
}
// 取消点赞
const removeLike = (data) => {
  return Like.deleteOne(data)
}
// 评论
const createComment = (data) => {
  return Comment.create(data)
}
// 查询动态列表
const queryPostList = (option) => {
  const {
    pageSize,
    pageStart
  } = option
  return Post.find().skip(pageSize * pageStart).limit(pageSize).populate('user').sort({'create': -1}).exec()
}
// 根据 post 查询评论
const queryCommentsByPost = (post) => {
  return Comment.find({post: post._id}).populate('user').sort({'create': 1}).exec()
}

// 根据post查询like
const queryLikesByPost = (post) => {
  return Like.find({post: post._id}).populate('user').sort({'create': 1}).exec()
}
// 查询该动态是否被点赞过
const checkPostIsLike = (likeList, user) => {
  if (!user) {
    return false
  }
  let flag = false
  for (let i = 0; i < likeList.length; i++) {
    if (likeList[i].user._id == user._id) {
      flag = true
      break
    }
  }
  return flag
}
module.exports = {
  createPost,
  createLike,
  removeLike,
  createComment,
  queryPostList,
  queryCommentsByPost,
  queryLikesByPost,
  checkPostIsLike
}