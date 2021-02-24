<template>
  <div class="register-wrapper">
    <nav-head @leftClick="back">
      <template v-slot:left>
        <i class="iconfont icon-arrow-left" style="font-size: 24px"></i>
      </template>
    </nav-head>
    <div class="register-container">
      <div class="label">
        <span>新用户注册</span>
      </div>
    <div class="input-box">
      <input type="text"
        v-model="account"
        placeholder="账号长度为6-10位"
        :maxlength="10"
        @change="queryAccountIsExit">
    </div>
    <div class="input-box">
      <input v-model="password"
      type="password"
      placeholder="密码长度为8-13位"
      :maxlength="13"
      >
    </div>
    <div class="input-box">
      <input type="password"
      v-model="repeatPassword"
      placeholder="再次确认密码"
      :maxlength="13"
      >
    </div>
    <div class="register-btn" @click="onRegister">
      <i class="cubeic-arrow"></i>
    </div>
    </div>
  </div>
</template>

<script>
import NavHead from '_c/base/NavHead.vue'
import MD5 from 'js-md5'
import {
  queryAccount
} from '@/config/request'
export default {
  data () {
    return {
      account: '',
      password: '',
      repeatPassword: '',
      isAccountAvailable: false
    }
  },
  components: {
    NavHead
  },
  methods: {
    // 注册
    async onRegister () {
      if (!this.isAccountAvailable) {
        this.$createDialog({
          type: 'alert',
          title: '账号不可用',
          content: '账号已存在'
        }).show()
        return
      }
      if (!this.verify()) {
        return
      }
      try {
        const toast = this.$createToast({
          time: 0,
          txt: '注册中',
          mask: true
        })
        toast.show()
        const res = await this.$store.dispatch('onRegister', {
          account: this.account,
          password: MD5(this.password)
        })
        toast.hide()
        if (res && res.code === 200) {
          this.$router.push({
            path: '/message'
          })
          this.$socket.emit('login', this.$store.state.user)
        } else {
          this.$createDialog({
            type: 'alert',
            title: '注册失败',
            content: '注册失败请重试'
          }).show()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 校验
    verify () {
      if (this.account.length < 6 || this.account.length > 10) {
        this.$createDialog({
          type: 'alert',
          title: '账号长度不合法',
          content: '账号长度为6-10位'
        }).show()
        return false
      }
      if (this.password.length < 8 || this.password.length > 13) {
        this.$createDialog({
          type: 'alert',
          title: '密码长度不合法',
          content: '密码长度为8-13位'
        }).show()
        return false
      }
      if (this.repeatPassword !== this.password) {
        this.$createDialog({
          type: 'alert',
          title: '密码不一致',
          content: '两次输入密码不一致'
        }).show()
        return false
      }
      return true
    },
    // 查询账号是否已经存在
    queryAccountIsExit () {
      queryAccount(this.account).then(res => {
        if (res.code === 200) {
          this.isAccountAvailable = true
        } else {
          this.isAccountAvailable = false
          this.$createDialog({
            type: 'alert',
            title: '账号已存在',
            content: '该账号已存在'
          }).show()
        }
      })
    },
    // 返回
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.register-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 10;
  .register-container {
    margin: 80px auto 0;
    width: 300px;
    .label {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .input-box {
      width: 300px;
      height: 50px;
      margin: 10px auto;
      padding: 0 6px;
      display: flex;
      background: #ccc;
      border-radius: 50px;
      text-align: center;
      overflow: hidden;
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        outline: none;
        background: #ccc;
        text-align: center;
        color: black;
        caret-color: #0366d6;
        font-size: 20px;
        letter-spacing: 2px;
        }
    }
    .register-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 20px auto;
      background: #0366d6;
      text-align: center;
      line-height: 60px;
      color: #fff;
    }
  }
}
</style>
