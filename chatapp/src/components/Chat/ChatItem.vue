<template>
  <div class="chat-item" :class="isMine ? 'chat-mine': ''">
    <div class="avatar-wrapper">
      <avatar imgurl="http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1"></avatar>
    </div>
    <div class="text-wrapper" :class="isMine ? 'right-arrow': 'left-arrow'">
      <p>12345</p>
    </div>
  </div>
</template>

<script>
import Avatar from 'components/base/Avatar'
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

<style lang="stylus" scoped>
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
     padding: 4px;
     border-radius : 10px;
     background-color : green;
     position : relative;
      &.left-arrow::before {
        content: '';
        width : 0;
        height : 0;
        position :absolute;
        top: 20px;
        left: -6px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right : 6px solid green;
      }
      &.right-arrow::after {
        content: '';
        width : 0;
        height : 0;
        position :absolute;
        top: 20px;
        right: -6px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left : 6px solid green;
      }
   }
 }
</style>
