<template>
  <div>
  <div v-if="showTime" class="time">{{getTime}}</div>
  <div class="chat-item" :class="chatInfo.isMine ? 'chat-mine': ''">
    <div class="avatar-wrapper">
      <avatar :imgurl="chatInfo.owner.avatar"></avatar>
    </div>
    <div class="text-wrapper" :class="chatInfo.isMine ? 'right-arrow blue-style': 'left-arrow white-style'">
      {{chatInfo.content}}
    </div>
  </div>
  </div>
</template>

<script>
import Avatar from '_c/base/Avatar'
import { formatTime } from '_u/formatTime'
export default {
  props: {
    chatInfo: {
      type: Object,
      default: () => {}
    },
    showTime: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Avatar
  },
  computed: {
    getTime () {
      return formatTime(this.chatInfo.time)
    }
  }
}
</script>

<style lang="scss" scoped>
  .time {
    text-align: center;
    color: #666;
    font-size: 14px;
   }
 .chat-item {
   display:flex;
   padding: 10px 0;
   &.chat-mine {
     flex-direction : row-reverse;
   }
   .avatar-wrapper {
     width: 50px;
     height: 50px;
     margin : 0 10px;
   }
   .text-wrapper {
     padding: 6px;
     margin-top: 8px;
     align-self: center;
     border-radius : 10px;
     font-size: 16px;
     line-height: 28px;
     min-height: 28px;
     text-align: left;
     max-width: 200px;
     word-break: break-all;
     position : relative;
     &.blue-style {
       background-color: #5bc0de;
       color: #fff;
     }
     &.white-style {
       background-color: #fff;
       color: #000;
     }
      &.left-arrow::before {
        content: '';
        width : 0;
        height : 0;
        position :absolute;
        top: 12px;
        left: -6px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right : 6px solid #fff;
      }
      &.right-arrow::after {
        content: '';
        width : 0;
        height : 0;
        position :absolute;
        top: 12px;
        right: -6px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left : 6px solid #5bc0de;
      }
   }
 }
</style>
