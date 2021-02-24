<template>
  <div class="search-page">
    <nav-head @leftClick="onBack">
      <template v-slot:left>
        <i class="cubeic-back"></i>
      </template>
      <template v-slot:default>
        找人/找群
      </template>
    </nav-head>
    <div class="input-wrapper">
      <cube-input @change="onSearch" class="iconfont icon-search" v-model="targetAccount" :clearable="true" :autofocus="true" maxLength="20" placeholder="请输入对方账号"></cube-input>
    </div>
    <div class="result-list">
      <div v-if="userInfo && userInfo.account" @click="handleClick">
        <list-item :avatar='userInfo.avatar' :name="userInfo.nickname" :desc="userInfo.desc" ></list-item>
      </div>
    </div>
  </div>
</template>

<script>
import NavHead from '_c/base/NavHead'
import service from '_u/service'
import ListItem from '_c/base/ListItem.vue'
export default {
  data () {
    return {
      targetAccount: '',
      resultList: [],
      userInfo: {},
      isShow: false
    }
  },
  components: {
    NavHead,
    ListItem
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    },
    async onSearch () {
      this.userInfo = null
      const toast = this.$createToast({
        time: 0,
        txt: '正在搜索'
      })
      toast.show()
      const res = await service.get('user/queryUserInfo', {
        account: this.targetAccount
      })
      toast.hide()
      if (res && res.code === 200) {
        this.userInfo = res.result
      } else {
        this.$createToast({
          time: 1000,
          type: 'warn',
          txt: '没有找到该用户'
        }).show()
      }
    },
    handleClick () {
      this.$router.push({
        name: 'PersonInfo',
        params: this.userInfo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: #f7f7f7;
  .input-wrapper {
    margin-top: 50px;
    padding: 5px 10px;
    .cube-input {
      border-radius: 40px;
      overflow: hidden;
    }
    .cube-input_active::after {
      border-color: transparent;
    }
  }
  .result-list {

  }
}
</style>
