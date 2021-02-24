<template>
  <div class="login-wrapper">
      <div class="logo">
        <img src="@/assets/imgs/logo.jpg" alt="">
      </div>
      <div class="form-container">
      <div class="input-box">
        <div class="left-side-wrapper">
          <img v-if="avatarUrl" class="avatar" :src="avatarUrl" alt="">
        </div>
          <div class="center-wrapper">
            <input v-model="account" class="account-input" type="text" :maxlength="11" placeholder="请输入账号" @input="checkUserIsEXist">
          </div>
        <div class="right-side-wrapper">
          <div v-if="showAccountDelete" class="delete-icon" @click="clearAccount">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>
      <div class="input-box">
        <div class="left-side-wrapper">
        </div>
        <div class="center-wrapper">
          <input v-model="password" class="password-input" type="password" placeholder="请输入密码" :maxlength="13">
        </div>
        <div class="right-side-wrapper">
          <div v-if="showPasswordDelete" class="delete-icon" @click="clearPassword">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>
      <div class="login-btn" @click="onLogin">
        <i class="cubeic-arrow"></i>
      </div>
      <div class="login-bottom">
        <div class="item" @click="phoneNumLogin">
          手机号登录
        </div>
        <div class="item" @click="findPassword">
          找回密码
        </div>
        <div class="item" @click="register">
          新用户注册
        </div>
      </div>
      </div>
  </div>
</template>
<script>
import Storage from '_u/storage'
import MD5 from 'js-md5'
export default {
  data () {
    return {
      account: '',
      password: '',
      avatarUrl: '',
      tip: '',
      timer: ''
    }
  },
  computed: {
    showAccountDelete () {
      return this.account.length > 0
    },
    showPasswordDelete () {
      return this.password.length > 0
    }
  },
  methods: {
    // 检查是否登录过
    checkUserIsEXist () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const accountList = Storage.$store.get('accountList')
        const user = accountList.find((item) => {
          return item.account === this.account
        })
        if (user) {
          this.avatarUrl = user.userInfo.avatar
        } else {
          this.avatarUrl = ''
        }
      }, 500)
    },
    // 清空
    clearAccount () {
      this.account = ''
      this.avatarUrl = ''
    },
    clearPassword () {
      this.password = ''
    },
    // 登陆
    async onLogin () {
      if (!this.verify()) {
        return
      }
      try {
        const toast = this.$createToast({
          time: 0,
          txt: '登陆中',
          mask: true
        })
        toast.show()
        const res = await this.$store.dispatch('onLogin', {
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
            title: '登陆失败',
            content: '账号或密码错误，请重新输入'
          }).show()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 判断用户名密码是否合法
    verify () {
      // 账号长度为6-10
      if (this.account.length < 6 || this.account.length > 10) {
        this.dialogComponent || this.$createDialog({
          type: 'alert',
          title: '登录失败',
          content: '请输入正确的账号'
        }).show()
        return false
      }
      // 校验密码
      if (this.password.length < 8 || this.password.length > 13) {
        this.$createDialog({
          type: 'alert',
          title: '登录失败',
          content: '密码不合法'
        }).show()
        return false
      }
      return true
    },
    // 手机号登录
    phoneNumLogin () {
      console.log('phone login')
    },
    // 找回密码
    findPassword () {
      console.log('password')
    },
    // 新用户注册
    register () {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: white;
    z-index: 10;
    .logo {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      img {
        width: 120px;
        height: 54px;
      }
    }
    .form-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .input-box {
        width: 300px;
        height: 50px;
        margin: 10px auto;
        padding: 0 6px;
        display: flex;
        background: #ccc;
        border-radius: 50px;
        .left-side-wrapper, .right-side-wrapper {
          width: 50px;
        }
        .left-side-wrapper {
          padding: 5px;
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .right-side-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .center-wrapper {
          flex: 1;
          .account-input, .password-input {
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
      }
    }
    .login-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 20px auto;
      background: #0366d6;
      color: #fff;
      text-align: center;
      line-height: 60px;
    }
    .login-bottom {
      position: fixed;
      left: 0;
      bottom: 20px;
      width: 100%;
      display: flex;
      .item {
        position: relative;
        flex: 1;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        &::after {
          display: block;
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background-color: #666;
          content: '';
        }
        &:last-child {
          &::after {
            display: none;
          }
        }
      }
    }
}
</style>
<style lang="scss">

</style>
