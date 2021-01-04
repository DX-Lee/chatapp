<template>
  <div class="login-wrapper">
      <div class="logo">
        <img src="@/assets/imgs/logo.jpg" alt="">
      </div>
      <div class="login-account">
        <cube-input v-model="account"
        :type="accountInputOption.type"
        :placeholder="accountInputOption.placeholder"
        @blur="onAccountBlur"
        @focus="onAccountFocus"
        @input="onAccountInput"
        >
        <template v-slot:prepend>
          <div class="avatar">
            <img :src="imgUrl" alt="">
          </div>
        </template>
        <template v-slot:append>
          <div class="option">
            <i v-show="isShowAccountClear" class="cubeic-wrong" @click="clearAccount" style="margin-right: 8px"></i>
            <i class="cubeic-select" @click="selectOtherAccount"></i>
          </div>
        </template>
        </cube-input>
      </div>
      <div class="login-password">
        <cube-input v-model="password"
        :type="passwordInputOption.type"
        :placeholder="passwordInputOption.placeholder"
        @blur="onPasswordBlur"
        @focus="onPasswordFocus"
        @input="onPasswordInput"
        >
        <template v-slot:prepend>
          <div @click="changePasswordVisible">
            <i :class="isshowPassword ? 'cubeic-eye-visible' : 'cubeic-eye-invisible'" style="font-size: 20px">
            </i>
          </div>
        </template>
        <template v-slot:append>
          <div class="option" @click="clearPassword">
            <i v-if="isShowPasswordClear" class="cubeic-wrong"></i>
          </div>
        </template>
        </cube-input>
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
      <register ref="register"></register>
  </div>
</template>
<script>
import Register from '_c/register/Register'
export default {
  data () {
    return {
      account: '',
      password: '',
      imgUrl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1',
      accountInputOption: {
        type: 'number',
        placeholder: '账号/手机号'
      },
      passwordInputOption: {
        type: 'password',
        placeholder: '请输入密码'
      },
      isshowPassword: false,
      isShowAccountClear: false,
      isShowPasswordClear: false,
      tip: '',
      timer: '',
      isLogin: true
    }
  },
  components: {
    Register
  },
  methods: {
    // 清除账号输入框
    clearAccount () {
      this.account = ''
      this.isShowAccountClear = false
    },
    clearPassword () {
      this.password = ''
    },
    selectOtherAccount () {
      console.log('下拉选择')
    },
    // 密码是否可视
    changePasswordVisible () {
      this.isshowPassword = !this.isshowPassword
      if (this.isshowPassword) {
        this.passwordInputOption.type = 'txt'
      } else {
        this.passwordInputOption.type = 'password'
      }
    },
    // 账号输入框失去焦点
    onAccountBlur () {
      this.timer = setTimeout(() => {
        this.isShowAccountClear = false
        clearTimeout(this.timer)
      }, 20)
    },
    onAccountFocus () {
      if (this.account) {
        this.isShowAccountClear = true
      }
    },
    onAccountInput () {
      if (this.account) {
        this.isShowAccountClear = true
      }
    },
    // 密码输入框失去焦点
    onPasswordBlur () {
      this.timer = setTimeout(() => {
        this.isShowPasswordClear = false
        clearTimeout(this.timer)
      }, 20)
    },
    // 密码输入框获得焦点
    onPasswordFocus () {
      if (this.password) {
        this.isShowPasswordClear = true
      }
    },
    // 密码输入
    onPasswordInput () {
      if (this.password) {
        this.isShowPasswordClear = true
      }
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
          password: this.password
        })
        toast.hide()
        if (res && res.code === 200) {
          this.$router.push({
            path: '/message'
          })
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
      this.$refs.register.show()
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
    .login-account {
      width: 300px;
      margin: 0 auto 20px;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .option {
        width: 100%;
        height: 100%;
        line-height: 50px;
        text-align: right;
      }
    }
    .login-password {
      width: 300px;
      margin: 0 auto;
      .option {
        width: 100%;
        height: 100%;
        line-height: 50px;
        text-align: right;
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
  .cube-input {
    background: #ccc;
    height: 50px;
    border-radius: 50px;
    caret-color: #0366d6; // 光标颜色
    color: black;
    overflow: hidden;
    &.cube-input_active::after {
      border-color: transparent;
    }
    .cube-input-prepend {
      width: 50px;
      height: 50px;
      margin-left: 10px;
      color: blue;
    }
    .cube-input-field {
      text-align: center;
      color: black;
      font-size: 20px;
      letter-spacing: 2px;
      font-weight: 400;
      &::placeholder {
        font-size: 16px;
        letter-spacing: normal;
        color: #666;
      }
    }
    .cube-input-append {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      font-size: 20px;
    }
  }
</style>
