<template>
  <div id="app">
      <router-view></router-view>
      <tab></tab>
      <tip ref="tip" :information='this.newMessageInfo'></tip>
  </div>
</template>
<script>
import Tab from '_c/tab/Tab'
import Tip from '_c/base/Tip'
import Storage from '_u/storage'
import {
  formatChatListTime
} from '_u/formatTime'
export default {
  components: {
    Tab,
    Tip
  },
  data () {
    return {
      newMessageInfo: {}
    }
  },
  sockets: {
    receiveMessage (data) {
      const {
        content,
        fromUser,
        chatId,
        create
      } = data
      // 如果在聊天页面且消息来自当前聊天对象时
      if (this.$route.name === 'Chat' && this.$storage.read('currentChatPerson')._id === fromUser._id) {
        this.$bus.$emit('currentChatMessage', data)
        this.$socket.emit('ackMessage', {
          user: this.$storage.read('userInfo')._id,
          chatId: data.chatId
        })
      } else if (this.$route.name === 'Message') {
        // 如果在消息页面时
        this.$bus.$emit('receiveNewMessage', data)
      } else {
        // 否则以弹窗的形式提醒
        this.newMessageInfo = {
          username: fromUser.nickname,
          message: content,
          avatar: fromUser.avatar
        }
        const sessionList = this.$store.state.sessionList.slice()
        const session = sessionList.find(session => session.chatId === chatId)
        if (session) {
          session.lastMessage = content
          session.lastMsgTime = formatChatListTime(new Date(create).getTime())
          session.newMsgCount += 1
        } else {
          const newSession = {
            personInfo: fromUser,
            lastMessage: content,
            lastMsgTime: formatChatListTime(new Date(create).getTime()),
            chatId,
            newMsgCount: 1
          }
          sessionList.unshift(newSession)
        }
        this.$store.commit('SET_SESSIONLIST', sessionList)
        this.$refs.tip.show()
      }
    }
  },
  mounted () {
    this.initSocket()
  },
  beforeDestroy () {
    this.$socket.disconnect()
  },
  methods: {
    initSocket () {
      // 建立连接
      this.$socket.connect()
      // 如果已经登录过
      const user = Storage.$store.get('currentAccount')
      if (user) {
        this.$socket.emit('update', user)
      } else {
        this.$router.push('login')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
}
</style>
