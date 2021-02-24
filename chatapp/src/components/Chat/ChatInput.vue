<template>
  <div class="chat-input-wrapper">
    <input class="chat-input" type="text" v-model="message">
    <div class="send-wrapper">
      <div class="send-btn" @click="sendMessage">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage () {
      if (!this.message) {
        return
      }
      this.$emit('handleMessage', this.message)
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-input-wrapper {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #f2f2f2;
  box-sizing: border-box;
  padding: 10px;
  .chat-input {
    flex: 1;
    padding: 0 10px;
    outline: none;
    border-radius: 10px;
  }
  .send-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    padding: 2px;
    .send-btn {
      padding: 4px;
      border-radius: 4px;
      background: #5bc0de;
      color: #fff;
    }
  }
}
</style>
