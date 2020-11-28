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
      <div ref="text" class="text-wrapper" :class="isLongText? 'longText': ''">
        {{postData.content}}
      </div>
      <div v-if="isShowFold" @click="showMore" class="showmore">{{foldText}}<i :class="isLongText? 'iconfont icon-arrow-down':'iconfont icon-arrow-up'"></i></div>
      <div class="img-wrapper">
        <div @click="selectPic(index)" class="img-box" v-for="(pic,index) in postData.picList" :key="index">
          <img :src='pic.url' alt="">
        </div>
      </div>
    </div>
    <div class="operator">
      <div @click="onComment" class="say"><i class="iconfont icon-pinglun"></i></div>
      <div class="like">
        <span @click="cancelLike" v-if="postData.isLike"><i class='iconfont icon-view'></i></span>
        <span @click="addLike" v-else><i class="iconfont icon-dianzan"></i></span>
      </div>
    </div>
    <div v-if="postData.likeList.length" class="like-list">
      <span class="iconfont icon-dianzan"></span>
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
      <button @click="send" class="send-btn">发送</button>
    </div>
  </div>
</template>

<script>
import Avatar from 'components/base/Avatar'
import service from '@/util/service'
import { mapGetters } from 'vuex'
export default {
  props: {
    postData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLongText: false,
      foldText: '展开',
      isShowFold: false
    }
  },
  components: {
    Avatar
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 点击后展开收起
    showMore () {
      this.isLongText = !this.isLongText
      if (this.isLongText) {
        this.foldText = '展开'
      } else {
        this.foldText = '收起'
      }
    },
    // 判断是否超出多行文本
    isMore () {
      const height = this.$refs.text.clientHeight
      if (height > 60) {
        this.isLongText = true
        this.isShowFold = true
      }
    },
    // 点击评论
    onComment () {
      console.log('评论')
      this.$refs.inputbox.focus()
    },
    // 点赞
    async addLike () {
      const response = await service.post('post/addlike', {
        postId: this.postData.id
      })
      if (response.code === 0) {
        this.postData.isLike = true
        console.log(response.data)
        this.postData.likeList.push({
          post: this.postData.id,
          user: this.user
        })
        console.log(this.postData.likeList)
      } else {
        console.log('点赞失败')
      }
    },
    // 取消点赞
    async cancelLike () {
      const response = await service.post('post/cancelLike', {
        postId: this.postData.id
      })
      if (response.code === 0) {
        this.postData.isLike = false
        const index = this.postData.likeList.findIndex((item) => {
          return item.user._id === this.user._id
        })
        this.postData.likeList.splice(index, 1)
      } else {
        console.log('取消点赞失败')
      }
    },
    // 发表评论
    async send () {
      const value = this.$refs.inputbox.value
      if (value) {
        const resp = await service.post('post/addcomment', {
          postId: this.postData.id,
          content: value
        })
        if (resp.code === 0) {
          console.log(resp.data)
          this.postData.comments.push({
            content: resp.data.content,
            user: this.user
          })
        } else {
          console.log('评论失败')
        }
        this.$refs.inputbox.value = ''
      }
    },
    // 点击图片后查看
    selectPic (index) {
      this.$emit('imgSelect', this.picList, index)
    }
  },
  mounted () {
    this.isMore()
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
    overflow: hidden;
    padding: 5px 0px;
    .like {
      float: right;
      margin-right: 20px;
      .icon-dianzan {
        font-size: 24px;
      }
    }
    .say {
      float: right;
      margin-right: 10px;
      .icon-pinglun {
        font-size: 26px;
      }
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
    margin-top: 5px;
    .input-box {
      width: 80%;
      padding: 4px;
      outline: none;
      background: #f3f3f3;
    }
    .send-btn {
      border: 1px solid #ccc;
      outline: none;
      margin-left: 5px;
    }
  }
}

</style>
