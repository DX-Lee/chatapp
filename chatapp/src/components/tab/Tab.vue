<template>
  <div class="tab">
    <router-link tag="div" class="item" to="/message">
      <span class="iconfont icon-message"></span>
    </router-link>
    <router-link tag="div" class="item" to="/group">
    <span class="iconfont icon-sub-account"></span>
    </router-link>
    <router-link tag="div" class="item" to="/post">
    <i class="iconfont icon-user"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.tab {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: white;
    padding: 5px;
    border-top: 1px solid #ccc;
    display: flex;
    .item {
      flex: 1;
      text-align: center;
      .iconfont {
        font-size: 40px;
      }
      &.router-link-active {
        .iconfont {
          color: red;
        }
      }
    }
}
</style>>
