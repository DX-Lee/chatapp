<template>
  <div class="search-page">
    <nav-head>
      <template v-slot:left>
        <i class="cubeic-back"></i>
      </template>
      <template v-slot:default>
        找人/找群
      </template>
    </nav-head>
    <div class="input-wrapper">
      <cube-input @change="onSearch" class="iconfont icon-search" v-model="key" :clearable="true" :autofocus="true" maxLength="20" :placeholder="placeholder"></cube-input>
    </div>
    <div class="result-list">
      <ul>
        <list-item ></list-item>
      </ul>
      <div v-if="noResult">
        该用户不存在
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
      key: '',
      placeholder: '账号或者手机号',
      noResult: false,
      userInfo: {}
    }
  },
  components: {
    NavHead,
    ListItem
  },
  methods: {
    async onSearch () {
      const res = await service.get('user/queryUserInfo', {
        account: this.key
      })
      if (res && res.code === 200) {
        console.log(res)
        this.userInfo = res.result
      } else {
        this.noResult = true
      }
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
