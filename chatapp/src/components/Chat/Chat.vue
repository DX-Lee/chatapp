<template>
    <div class="chat-wrapper">
      <nav-head class="nav" :title="friendInfo.nickname" @leftClick="onBack">
        <template v-slot:left>
          <i class="iconfont icon-arrow-left"></i>
        </template>
      </nav-head>
      <div class="chat-panel">
        <cube-scroll ref="scroll"
        :data="messageList"
        :options='scrollOptions'
        :scroll-events="['scroll', 'scroll-end']"
        @scroll="onScrollHandle"
        @scroll-end='handlePullingDown'
        >
          <div v-show="isPullingDown" class="pulling-down-Loading">
            <cube-loading></cube-loading>
          </div>
          <ul :style="{'min-height': computedHeight + 'px'}">
            <transition-group name="list">
            <li v-for="message in messageList" :key="message.time">
              <chat-item :chatInfo="message" :showTime="message.isShowTime"></chat-item>
            </li>
            </transition-group>
          </ul>
        </cube-scroll>
      </div>
      <chat-input @handleMessage='sendMessage'></chat-input>
    </div>
</template>
<script>
import ChatItem from './ChatItem'
import NavHead from '_c/base/NavHead'
import ChatInput from './ChatInput'
import storage from '_u/storage'
import {
  sendChatMessage,
  pullNewMessage
} from '@/config/request'

const MAX_INTERVAL = 1000 * 60 * 3 // 消息时间最大间隔3分钟
const MAX_ONEPAGE_COUNT = 7 // 一屏最大消息数量
export default {
  data () {
    return {
      friendInfo: {},
      content: '',
      scrollOptions: {
        // pullDownRefresh: {
        //   threshold: 40,
        //   stop: 0,
        //   topTime: 0,
        //   txt: '更新成功'
        // },
        bounce: true
      },
      messageList: [],
      newMsgCount: 0,
      noMore: false,
      isPullingDown: false,
      oldScrollTop: 0,
      computedHeight: 0, // 计算scroll高度
      showMessageCount: 0 // 用来记录显示的消息数量
    }
  },
  components: {
    ChatItem,
    NavHead,
    ChatInput
  },
  methods: {
    // 返回
    onBack () {
      this.$router.go(-1)
    },
    // 下拉加载消息
    onPullingDown () {
      // console.log(this.showMessageCount)
      // console.log(this.history)
      if (this.noMore) {
        this.$refs.scroll.forceUpdate()
        return
      }
      const oldHeight = this.$refs.scroll.scroll.scroller.clientHeight
      const list = this.history.slice(-(this.showMessageCount + MAX_ONEPAGE_COUNT), -this.showMessageCount)
      if (list.length < MAX_ONEPAGE_COUNT) {
        this.noMore = true
      }
      this.showMessageCount += MAX_ONEPAGE_COUNT
      this.messageList = list.concat(this.messageList)
      this.$nextTick(() => {
        const newHeight = this.$refs.scroll.scroll.scroller.clientHeight
        this.$refs.scroll.scrollTo(0, -(newHeight - oldHeight))
      })
    },
    // 监听滚动位置
    onScrollHandle (pos) {
      // 向上滚动高度大于 40 则触发加载
      if (pos.y > 40) {
        // console.log(pos.y)
        this.isPullingDown = true
      }
    },
    // 处理下拉刷新
    handlePullingDown (pos) {
      if (this.isPullingDown) {
        this.onPullingDown()
        this.isPullingDown = false
      }
    },
    // 收到对方的消息
    onListenMessage (data) {
      console.log(data)
      const {
        chatId,
        content,
        create,
        fromUser
      } = data
      const time = new Date(create).getTime()
      const len = this.messageList.length
      const isShowTime = len > 0 ? (time - this.messageList[len - 1].time > MAX_INTERVAL) : true
      const messageData = {
        chatId,
        content,
        time: new Date(time).getTime(),
        owner: fromUser,
        isMine: false,
        isShowTime
      }
      this.messageList.push(messageData)
      this.history.push(messageData)
      const historyList = storage.read('historyList')
      historyList[this.friendInfo.account] = this.history
      storage.write('historyList', historyList)
      this.showMessageCount += 1
      this.scrollToEnd()
    },
    // 发送消息
    async sendMessage (message) {
      const res = await sendChatMessage({
        toUser: this.friendInfo._id,
        content: message
      })
      if (res.code === 200) {
        const {
          content,
          chatId,
          create
        } = res.result
        const time = new Date(create).getTime()
        const len = this.messageList.length
        const isShowTime = len > 0 ? (time - this.messageList[len - 1].time > MAX_INTERVAL) : true
        const messageData = {
          content,
          chatId,
          time,
          owner: storage.read('userInfo'),
          isMine: true,
          isShowTime
        }
        this.messageList.push(messageData)
        this.history.push(messageData)
        const historyList = storage.read('historyList')
        historyList[this.friendInfo.account] = this.history
        storage.write('historyList', historyList)
        this.showMessageCount += 1
        this.scrollToEnd()
      } else {
        this.$createToast({
          type: 'warn',
          txt: '发送失败',
          time: 500
        }).show()
      }
    },
    // 获取聊天新消息
    async getNewMessage () {
      const res = await pullNewMessage({
        toUser: this.friendInfo._id,
        count: this.newMsgCount
      })
      this.newMsgCount = 0
      if (res.code === 200) {
        this.messageList = this.formatList(res.result)
        this.history = this.history.concat(this.messageList)
        // 保存在内存中
        const historyList = storage.read('historyList')
        historyList[this.friendInfo.account] = this.history
        storage.write('historyList', historyList)
        this.showMessageCount = this.messageList.length
        this.scrollToEnd()
      } else {
        this.$createToast({
          type: 'warn',
          txt: '获取消息失败',
          time: 1000
        }).show()
      }
    },
    // 获取历史消息
    getHistoryMessage () {
      if (this.history.length < 8) {
        // slice 参数取负表示从后取
        this.messageList = this.history.slice(-MAX_ONEPAGE_COUNT)
        this.noMore = true
      } else {
        this.messageList = this.history.slice(-MAX_ONEPAGE_COUNT)
      }
      this.showMessageCount = this.messageList.length
      this.scrollToEnd()
    },
    // 格式化消息
    formatList (list) {
      return list.map((message, index, arr) => {
        let isShowTime
        const time = new Date(arr[index].create).getTime()
        if (index === 0) {
          isShowTime = true
        } else {
          const lastTime = new Date(arr[index - 1].create).getTime()
          if (time - lastTime > MAX_INTERVAL) {
            isShowTime = true
          } else {
            isShowTime = false
          }
        }
        return {
          content: message.content,
          chatId: message.chatId,
          owner: message.fromUser,
          time,
          isMine: message.isMine,
          isShowTime
        }
      })
    },
    // 滚动到底部
    scrollToEnd () {
      const timer = setTimeout(() => {
        const BScroll = this.$refs.scroll
        const y = BScroll.scroll.maxScrollY
        BScroll.scrollTo(0, y)
        clearTimeout(timer)
      }, 20)
    }
  },
  created () {
    if (Object.keys(this.$route.params).length) {
      storage.write('currentChatPerson', this.$route.params.personInfo)
      this.friendInfo = this.$route.params.personInfo
      this.newMsgCount = this.$route.params.newMsgCount
    } else {
      this.friendInfo = storage.read('currentChatPerson')
    }
    // 如果有新消息显示新消息，没有则显示历史消息
    const historyList = storage.read('historyList')
    const account = this.friendInfo.account
    this.history = historyList[account] || []
    if (this.newMsgCount > 0) {
      this.getNewMessage()
    } else {
      this.getHistoryMessage()
    }
    // 添加事件监听
    this.$bus.$on('currentChatMessage', (data) => {
      this.onListenMessage(data)
    })
  },
  mounted () {
    // 保证内层高度大于 scroll 高度
    this.computedHeight = this.$refs.scroll.$el.clientHeight + 1
  },
  beforeDestroy () {
    // 移除事件
    this.$bus.$off('currentChatMessage')
  }
}
</script>
<style lang="scss" scoped>
  .chat-wrapper {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 300;
    background: #f2f2f2;
    .nav {
      background: #f7f7f7;
      color: #000;
      .icon-arrow-left {
        font-size: 40px;
      }
    }
    .chat-panel {
      position: absolute;
      top: 50px;
      bottom: 50px;
      left: 0;
      right: 0;
      .pulling-down-Loading {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
