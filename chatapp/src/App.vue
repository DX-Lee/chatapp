<template>
  <div id="app">
      <router-view></router-view>
      <tab></tab>
  </div>
</template>
<script>
import Tab from 'components/tab/Tab'
export default {
  components: {
    Tab
  }
}
</script>
<style lang="scss">
#app {
}
</style>
