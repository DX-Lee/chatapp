<template>
  <div class="post-item">
    <div class="title">
      <div class="left">
        <avatar :imgurl="postData.avatar"></avatar>
      </div>
      <div class="right">
        <div class="name">{{postData.nickname}}</div>
        <div class="time">
          {{postData.time}}
        </div>
      </div>
    </div>
    <div class="content">
      <div class="text-wrapper">
        {{postData.content}}
      </div>
      <div class="img-wrapper" v-if="postData.picList.length">
        <div @click="selectPic(index)" class="img-box" v-for="(pic,index) in postData.picList" :key="index">
          <img :src='pic.url' alt="">
        </div>
      </div>
    </div>
    <div class="operator">
      <div class="like">
        <div @click="cancelLike" v-if="postData.isLike">
          <svg-icon icon-class='dianzan-active' size='20'></svg-icon>
        </div>
        <div @click="addLike" v-else>
          <svg-icon icon-class='dianzan' size='20'></svg-icon>
        </div>
      </div>
      <div @click="onComment" class="comment-btn">
        <svg-icon icon-class='message' size='20'></svg-icon>
      </div>
    </div>
    <div v-if="postData.likeList.length" class="like-list">
      <svg-icon icon-class='dianzan' size='20'></svg-icon>
      <span v-for="(item,index) in postData.likeList" :key="index" class="like-nickname">
        {{item.user.nickname}}
      </span>
    </div>
    <div v-if="this.postData.comments.length" class="comment-list">
      <div class="comment-item" v-for="(comment,index) in postData.comments" :key="index">
        <span class="nickname">{{comment.user.nickname}}</span> : {{comment.content}}
      </div>
    </div>
    <div class="comment-input">
      <input ref="inputbox" class="input-box" type="text">
      <div @click="send" class="send-btn">评论</div>
    </div>
  </div>
</template>

<script>
import Avatar from '_c/base/Avatar'
import service from '_u/service'
import { mapGetters } from 'vuex'
export default {
  props: {
    postData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Avatar
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 点击评论
    onComment () {
      this.$refs.inputbox.focus()
    },
    // 点赞
    async addLike () {
      const res = await service.post('post/addlike', {
        postId: this.postData.id
      })
      if (res && res.code === 200) {
        this.postData.isLike = true
        // console.log(res.result)
        this.postData.likeList.push({
          post: this.postData.id,
          user: this.user
        })
      } else {
        this.$createToast({
          type: 'warn',
          txt: '操作失败',
          time: 1000
        }).show()
      }
    },
    // 取消点赞
    async cancelLike () {
      const res = await service.post('post/cancelLike', {
        postId: this.postData.id
      })
      if (res && res.code === 200) {
        this.postData.isLike = false
        const index = this.postData.likeList.findIndex((item) => {
          return item.user._id === this.user._id
        })
        this.postData.likeList.splice(index, 1)
      } else {
        this.$createToast({
          type: 'warn',
          txt: '操作失败',
          time: 1000
        }).show()
      }
    },
    // 发表评论
    async send () {
      const value = this.$refs.inputbox.value
      if (value) {
        const res = await service.post('post/addcomment', {
          postId: this.postData.id,
          content: value
        })
        if (res && res.code === 200) {
          this.postData.comments.push({
            content: res.result.content,
            user: this.user
          })
        } else {
          this.$createToast({
            type: 'warn',
            txt: '操作失败',
            time: 1000
          }).show()
        }
        this.$refs.inputbox.value = ''
        this.$refs.inputbox.blur()
      }
    },
    // 点击图片后查看
    selectPic (index) {
      const list = this.postData.picList.map(item => item.url)
      this.$emit('imgSelect', list, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.post-item {
  padding: 10px;
  .title {
    display: flex;
    .left {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .time {
        color: #ccc;
      }
    }
  }
  .content {
    padding: 10px;
    .text-wrapper {
      overflow: hidden;
      letter-spacing: 1px;
      line-height: 20px;
    }
    .longText {
       display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .img-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 300px;
      margin-top: 10px;
      .img-box {
        max-width: 140px;
        flex: 1 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .showmore {
    display: inline-block;
    color: #4e61f2;
  }
  .operator {
    position: relative;
    display: flex;
    justify-content: flex-end;
    padding: 5px 0px;
    &::after {
      content: '';
      position: absolute;
      display: block;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      transform: scale(1, 0.5);
      background: #ccc;
    }
    .comment-btn {
      margin-left: 10px;
    }
  }
  .like-list {
    text-align: left;
    word-break: break-all;
    padding: 4px;
    font-size: 14px;
    .like-nickname {
      padding: 0 4px;
      color: #576b95;
    }
  }
  .comment-list {
    margin-top: 10px;
    font-size: 14px;
    .comment-item {
      padding: 5px;
      line-height: 18px;
      .nickname {
        color: #576b95;
      }
    }
  }
  .comment-input {
    margin-top: 4px;
    display: flex;
    .input-box {
      flex: 1;
      padding: 4px;
      outline: none;
      border-radius: 4px;
      background: #f3f3f3;
    }
    .send-btn {
      width: 40px;
      margin-left: 10px;
      color: #fff;
      text-align: center;
      font-size: 14px;
      line-height: 26px;
      background: #5bc0de;
      border-radius: 4px;
    }
  }
}

</style>
