module.exports = {
    // 需要登陆状态的api
    tokenApi: [
        '/api/user/queryUserInfo',
        '/api/user/queryPersonList',
        '/api/user/updateInformation',
        '/api/post/uploadImgAliyun',
        '/api/post/deleteImgAliyun',
        '/api/post/publishPost',
        '/api/post/addLike',
        '/api/post/cancelLike',
        '/api/post/addComment',
        '/api/post/getPostList',
        '/api/chat/querySessionList',
        '/api/chat/sendChatMessage',
        '/api/chat/deleteSession',
        '/api/chat/pullNewMessage'
    ],
    uploadPath: 'http://127.0.0.1:3000/images'
}