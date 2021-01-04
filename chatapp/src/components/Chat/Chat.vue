<template>
    <div class="chat-wrapper">
      <nav-head class="nav" :title="friendName" @leftClick="onBack">
        <template v-slot:left>
          <i class="iconfont icon-arrow-left"></i>
        </template>
      </nav-head>
      <div class="chat-panel">
        <cube-scroll>
          <chat-item></chat-item>
          <chat-item :isMine="false"></chat-item>
        </cube-scroll>
      </div>
      <div class="bottom">
        <input class="input-box" type="text">
        <button class="btn" @click="send">发送</button>
      </div>
    </div>
</template>
<script>
import ChatItem from './ChatItem'
import NavHead from '_c/base/NavHead'
export default {
  data () {
    return {
      friendName: '你好',
      options: {}
    }
  },
  components: {
    ChatItem,
    NavHead
  },
  methods: {
    // 返回
    onBack () {
      this.$router.go(-1)
    },
    getChatMessage () {
      this.chatMessage = []
    },
    send () {
      console.log('send message')
    }
  },
  created () {
    console.log(this.$route.query.uid)
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
      margin-top: 50px;
      flex: 1
    }
    .bottom {
      height: 50px;
      background: #ccc;
      box-sizing: border-box;
      padding: 10px;
      .input-box {
        width: 80%;
        height: 30px;
        box-sizing: border-box;
        outline: 0;
        padding: 0 10px;
        border-radius: 10px;
      }
      .btn {
        box-sizing: border-box;
        width: 20%;
        height: 30px;
        border: none;
        border-radius: 10px;
        background: green;
        outline: 0;
      }
    }
  }
</style>
