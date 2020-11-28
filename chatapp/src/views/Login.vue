<template>
  <div class="login-wrapper">
      <div class="title">
        <h1>Sign in ChatApp</h1>
      </div>
      <div class="content">
          <div class="avator-wrapper">
              <div class="avator">
                  <img src="@/assets/imgs/member.jpg" alt="">
              </div>
          </div>
          <div class="input-wrapper">
            <div v-if="isLogin">
              <div class="input">
                  <p>用户名</p>
                  <input ref="loginName" class="name" type="text" placeholder="6-10位数字或字母">
              </div>
              <div class="input">
                  <p>密码</p>
                  <input ref="loginPas" class="password" type="password" name="" id="" placeholder="6-12位数字或字母">
              </div>
            </div>
            <div v-else>
              <div class="input">
                  <p>用户名</p>
                  <input ref="registName" class="name" type="text" placeholder="6-10位数字或字母">
              </div>
              <div class="input">
                <p>密码</p>
                  <input ref="registPas" class="password" type="password" name="" id="registPassword" placeholder="6-12位数字或字母">
              </div>
            </div>
          </div>
          <div class="button-wrapper">
              <button v-if="isLogin" class="btn" @click="onLogin">登录</button>
              <button v-else class="btn" @click="onRegister">注册</button>
          </div>
          <div @click="change" class="bottom-tip">
            <span v-if="isLogin">没有账号？先注册</span>
            <span v-else>已有账号？登陆</span>
          </div>
      </div>
      <tip :content='tip' ref="errTip"></tip>
  </div>
</template>
<script>
import service from '@/util/service'
import Tip from 'components/base/Tip'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      tip: '',
      isLogin: true
    }
  },
  components: {
    Tip
  },
  methods: {
    // 登陆
    async onLogin () {
      const username = this.$refs.loginName.value
      const password = this.$refs.loginPas.value
      if (!this.isLegal(username, password)) {
        this.tip = '账号或者密码不合法'
        this.showTip()
        return
      }
      try {
        const res = await service.post('users/login', {
          username,
          password
        })
        if (res.code === 0) {
          this.$router.push({
            path: '/message'
          })
          this.setUser(res.data)
        } else {
          this.tip = '账号或者密码错误请重试'
          this.showTip()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 注册
    async onRegister () {
      const username = this.$refs.registName.value
      const password = this.$refs.registPas.value
      if (!this.isLegal(username, password)) {
        this.tip = '账号或者密码不合法'
        this.showTip()
        return
      }
      try {
        const res = await service.post('users/register', {
          username,
          password
        })
        if (res.code === 0) {
          this.setUser(res.data)
          this.$router.push({
            path: '/message'
          })
        } else {
          this.tip = '注册失败'
          this.showTip()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 判断用户名密码是否合法
    isLegal (name, password) {
      return name && password
    },
    // 提示弹窗
    showTip () {
      this.$refs.errTip.show()
    },
    // 切换登陆注册页面
    change () {
      this.isLogin = !this.isLogin
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  }
}
</script>
<style lang="scss" scoped>
    .login-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: white;
    z-index: 200;
    .title {
      position: fixed;
      left: 50%;
      top: 50px;
      width: 80%;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      font-weight: 300;
      text-align: center;
      transform: translateX(-50%);
    }
    .content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        width: 80%;
        text-align: center;
        background: white;
        padding: 30px;
        box-sizing: border-box;
        .title {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .avator-wrapper {
            width: 100px;
            height: 100px;
            margin: auto;
            border: 0px solid black;
            border-radius: 50%;
            overflow: hidden;
            .avator {
              img {
                  width: 100%;
                  height: 100%;
              }
            }
        }
        .input-wrapper {
            margin: 30px 0;
            .input {
                margin-top: 12px;
                margin-bottom: 14px;
                p {
                  font-size: 14px;
                  font-weight: 400;
                  text-align: left;
                  margin-bottom: 8px;
                }
                input {
                  width: 100%;
                  padding: 2px 4px;
                  border: 1px solid #ccc;
                  border-radius: 2px;
                  outline: none;
                  box-sizing: border-box;
                  &:focus {
                    border-color: #0366d6;
                    box-shadow: 0 0 0 3px rgba(3,102,214,.3);
                  }
                }
            }
        }
        .button-wrapper {
            .btn {
                width: 80%;
                height: 30px;
                background: #2ea44f;
                border: none;
                border-radius: 5px;
                color: white;
            }
        }
        .bottom-tip {
          margin-top: 16px;
          color: #0366d6;
        }
    }
}
</style>
