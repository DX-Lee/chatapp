const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const postRouter = require('./routes/post')
const chatRouter = require('./routes/chat')

const tokenUtil = require('./util/token')
const config = require('./config')
const mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/wechat', {useNewUrlParser: true, useCreateIndex: true})
.then(() => {
    console.log('连接成功')
}).catch((e) => {
    console.log('连接失败' + e)
})
const app = express();
// 跨域配置
app.use(function (req, res, next) {
    console.log(req.headers)
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, wec-access-token, Set-Cookie');
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})
// 拦截器
app.use(function (req, res, next) {
   const token = req.headers['wec-access-token'] || 'notoken'
   const user = tokenUtil.checkToken(token)
   if (user) {
       req.user = user
       // 续期
       tokenUtil.setToken({user, res})
       next()
   } else {
       // 判断是否在需要登录态的名单上
      if (config.tokenApi.indexOf(req.path) < 0) {
          next()
          return
        } else {
            res.json({
              code: 401,
              message: '无效token'
          })
        }
   }
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/post', postRouter);
app.use('/api/chat', chatRouter);
module.exports = app;
