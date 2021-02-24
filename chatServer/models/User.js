var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchemal = new mongoose.Schema({
    nickname: {type: String, maxlength: 20},
    avatar: String,
    account: String,
    desc: {type: String, maxlength: 20, default: ''},
    gender: String,
    birthday: Date,
    address: String,
    phoneNumber: String,
    friendList: {type: Schema.Types.Mixed},
    params: {type: Schema.Types.Mixed, default:{'vip': 0}}, // 用户额外信息
    update: {type: Date, default: Date.now},
    create: {type: Date, default: Date.now} 
}, {timestamps: {createdAt: 'create', updatedAt: 'update'}})

module.exports = mongoose.model('User', UserSchemal)