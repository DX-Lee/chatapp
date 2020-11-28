const jwt = require('jsonwebtoken') // jwt签名
const tokenTime = 1000 * 60 * 60 * 24 * 7 // 7天有效期
// 加密字符串
const secretText = 'jwttest'
module.exports = {
    // 设置token
    setToken (data) {
        const token = jwt.sign({user: data.user}, secretText, {
            expiresIn: tokenTime
        })
        data.res.cookie('token', token, {
            maxAge: tokenTime
        })
    },
    // 校验token
    checkToken (token) {
        let user = null
        try {
            const decoded = jwt.verify(token, secretText)
            user = decoded.user
        } catch (e) {
            console.log(e)
        }
        return user
    }
}