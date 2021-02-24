<template>
<transition appear name="move">
  <div class="publish-wrapper">
    <div class="top">
      <div class="cancel" @click="cancel">取消</div>
      <div class="btn" @click="publish">发表</div>
    </div>
    <div class="input-wrapper">
      <textarea v-model="content" @input="onInput" class="text" cols="21" rows="4" placeholder="分享新鲜事..." maxlength="80"></textarea>
      <div class="text-count">
        <span>{{this.textCount}}</span>/80
      </div>
    </div>
    <div class="img-content">
      <div class="upload-wrapper">
        <cube-upload :action="action" :max='5'
        v-model="picList"
        @file-click='selectPic'
        @file-removed='deletePic'
        @files-added='addPic'
        @file-error='uploadError'
        @file-success='uploadSuccess'
        ></cube-upload>
      </div>
      <div class="upload-count">
        <span>{{this.picList.length}}/5</span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { getCookie } from '_u/cookie'
import service from '_u/service'
export default {
  data () {
    return {
      content: '',
      textCount: 0,
      picList: [],
      action: {
        target: service.baseURL + 'post/uploadImgAliyun',
        headers: {
          'wec-access-token': getCookie('token')
        },
        fileName: 'image',
        withCredentials: true
      }
    }
  },
  methods: {
    // 取消
    cancel () {
      this.$router.push({
        name: 'Post',
        params: {
          ispublish: false
        }
      })
    },
    // 发表动态
    async publish () {
      if (!this.content && this.picList.length === 0) {
        this.$createDialog({
          type: 'alert',
          title: '提示',
          content: '不能上传空的内容'
        }).show()
        return
      }
      const dataList = []
      this.picList.forEach((item) => {
        if (item.response.code === 200 && item.response.result.url) {
          dataList.push(item.response.result)
        }
      })
      const res = await this.$store.dispatch('publishPost', {
        content: this.content,
        picList: dataList
      })
      if (res.code === 200) {
        this.$router.push({
          name: 'Post',
          params: {
            ispublish: true
          }
        })
      } else {
        this.$createToast({
          type: 'warn',
          txt: '发布失败',
          time: 1000
        })
      }
    },
    // 输入
    onInput () {
      this.textCount = this.content.length
    },
    // 点击上传的图片
    selectPic () {
      // console.log('click')
    },
    // 添加完图片后触发
    addPic () {
      // console.log(this.picList)
    },
    // 删除上传的图片
    deletePic () {
      // console.log('del')
    },
    // 上传图片失败
    uploadError () {
      this.$createToast({
        type: 'warn',
        txt: '上传失败',
        time: 1000
      })
    },
    uploadSuccess () {
      // console.log('suss')
    }
  }
}
</script>

<style lang="scss" scoped>
.move-enter-active, .move-leave-active {
  transition: all 0.5s
}
.move-enter, .move-leave-to {
  transform: translateX(100%)
}
.publish-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 80;
  .top {
    background: #E3EAEE;
    padding: 10px;
    overflow: hidden;
    .cancel {
      height: 30px;
      line-height: 30px;
      float: left;
    }
    .btn {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 5px;
      float: right;
      background: #1aad19;
    }
  }
  .input-wrapper {
    padding: 20px;
    .text {
      display: block;
      width: 100%;
      border: 0;
      outline: none;
      resize: none;
      font-size: 16px;
    }
    .text-count {
      text-align: right;
      line-height: 20px;
      color: #b2b2b2;
    }
  }
  .img-content {
    margin-top: 10px;
    margin-left: 10px;
    .upload-count {}
  }
}
</style>
