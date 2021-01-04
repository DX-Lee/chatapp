<template>
  <div class="chat-item" :class="isMine ? 'chat-mine': ''">
    <div class="avatar-wrapper">
      <avatar imgurl="http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1"></avatar>
    </div>
    <div class="text-wrapper" :class="isMine ? 'right-arrow b-style': 'left-arrow c-style'">
      v-bind:style 模块主要包含就是样式部分
    </div>
  </div>
</template>

<script>
import Avatar from '_c/base/Avatar'
export default {
  props: {
    data: Object,
    isMine: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Avatar
  }
}
</script>

<style lang="scss" scoped>
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
     &.b-style {
       background-color: #5bc0de;
       color: #fff;
     }
     &.c-style {
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
