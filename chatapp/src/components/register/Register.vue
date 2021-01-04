<template>
  <div v-if="visible" class="register-wrapper">
    <nav-head @leftClick="back">
      <template v-slot:left>
        <i class="cubeic-back"></i>
      </template>
    </nav-head>
    <div class="content">
        <div class="title">
        新用户注册
      </div>
    <div style="margin-bottom: 20px">
      <cube-input v-model="account"
        :clearable="clearable"
        placeholder="账号长度为6-10位"
      ></cube-input>
    </div>
    <div style="margin-bottom: 20px">
      <cube-input v-model="password"
      :clearable="clearable"
      type="password"
      placeholder="密码长度为8-13位"
      ></cube-input>
    </div>
    <div style="margin-bottom: 20px">
      <cube-input v-model="repeatPassword"
      :clearable="clearable"
      type="password"
      placeholder="再次确认密码"
      ></cube-input>
    </div>
    <div class="btn" @click="onRegister">
      <i class="cubeic-arrow"></i>
    </div>
    </div>
  </div>
</template>

<script>
import NavHead from '_c/base/NavHead.vue'
export default {
  data () {
    return {
      visible: false,
      account: '',
      password: '',
      repeatPassword: '',
      clearable: {
        visible: true,
        blurHidden: true
      }
    }
  },
  components: {
    NavHead
  },
  methods: {
    // 注册
    async onRegister () {
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
            title: '注册失败',
            content: '注册失败请重试'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
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
    // 返回
    back () {
      this.hide()
    },
    // 显示
    show () {
      this.visible = true
    },
    // 隐藏
    hide () {
      this.visible = false
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
  .content {
    margin: 80px auto 0;
    width: 300px;
    .title {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .btn {
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
