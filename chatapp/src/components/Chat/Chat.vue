<template>
    <div class="chat-wrapper">
      <div class="header">
        <i>hh</i>
        <span>好友</span>
      </div>
      <div class="content">
        <chat-item></chat-item>
        <chat-item :isMine="false"></chat-item>
      </div>
      <div class="bottom">
        <input class="input-box" type="text">
        <button class="btn" @click="send">发送</button>
      </div>
    </div>
</template>
<script>
import ChatItem from './ChatItem'
export default {
  data () {
    return {
    }
  },
  components: {
    ChatItem
  },
  methods: {
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
    .header {
      height: 40px;
      padding: 5px;
      line-height: 40px;
      text-align: center;
      background: #ccc;
    }
    .content {
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
