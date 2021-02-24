<template>
  <div class="edit-signature">
    <nav-head :title="title" @leftClick="back" @rightClick='publish'>
      <template v-slot:left>
        <i class="iconfont icon-arrow-left" style="font-size: 24px"></i>
      </template>
      <template v-slot:right>
          <div class="publish-btn">发布</div>
      </template>
    </nav-head>
    <div class="signature-container">
      <textarea class="signature" v-model="content" cols="21" rows="4" maxlength="80" placeholder="还没有个性签名"></textarea>
      <div class="options">
        <div class="option-btn" @click="onSynchronize" :class="{active: isSynchronize}">#同步到说说</div>
        <div class="count">{{computedCount}}/80</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHead from '_c/base/NavHead'
export default {
  data () {
    return {
      title: '个性签名',
      signature: '',
      content: '',
      isSynchronize: false
    }
  },
  created () {
    const userInfo = this.$store.state.user
    this.signature = userInfo.desc
    this.content = this.signature
  },
  components: {
    NavHead
  },
  computed: {
    computedCount () {
      return this.content.length
    }
  },
  methods: {
    back () {
      if (this.signature !== this.content) {
        this.$createDialog({
          type: 'confirm',
          title: '温馨提示',
          content: '你还未保存本次编辑, 是否保存?',
          confirmBtn: {
            text: '保存'
          },
          cancelBtn: {
            text: '不保存'
          },
          onConfirm: this.updateSignature,
          onCancel: () => {
            this.$router.go(-1)
          }
        }).show()
      } else {
        this.$router.go(-1)
      }
    },
    publish () {
      if (!this.content) {
        this.$createDialog({
          type: 'confirm',
          title: '温馨提示',
          content: '你当前已经清除了个性签名，确认是否要清除?',
          confirmBtn: {
            text: '确认清除'
          },
          cancelBtn: {
            text: '继续编辑'
          },
          onConfirm: this.updateSignature
        }).show()
      } else {
        this.updateSignature()
      }
    },
    // 更新个性签名
    async updateSignature () {
      const result = await this.$store.dispatch('updateUserInfo', {
        data: {
          desc: this.content
        }
      })
      if (this.isSynchronize) {
        const publishResult = await this.$store.dispatch('publishPost', {
          content: this.content
        })
        if (publishResult.code === 200) {
          // console.log('发布动态成功')
        } else {
          // console.log('发布失败')
        }
      }
      if (result.code === 200) {
        this.$createToast({
          time: 1000,
          txt: '更新成功'
        }).show()
      } else {
        this.$createToast({
          time: 1000,
          txt: '更新失败'
        }).show()
      }
      this.$router.push({
        name: 'Edit',
        params: {
          update: true
        }
      })
    },
    // 是否同步到说说
    onSynchronize () {
      this.isSynchronize = !this.isSynchronize
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-signature {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: #f7f7f7;
    .signature-container {
      margin: 60px 20px 10px;
      padding: 10px;
      background: #fff;
      border-radius: 6px;
      box-shadow: 0 0 10px #cccccc;
      .signature {
        width: 100%;
        padding: 0;
        border: none;
        line-height: 20px;
        &::placeholder {
          text-align: center;
          line-height: 80px;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .publish-btn {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      padding: 4px 10px;
      font-size: 14px;
      line-height: 14px;
      background: #5bc0de;
      color: #fff;
      border-radius: 10px;
    }
    .options {
      position: relative;
      display: flex;
      .option-btn {
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 300;
        line-height: 12px;
        background: #cccccc;
        border-radius: 4px;
        &.active {
          background: #5bc0de;
          color: #ffffff;
        }
      }
      .count {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        font-size: 14px;
        font-weight: 300;
        color: #cccccc;
      }
    }
  }
</style>
