<template>
  <div class="person-wrapper">
    <div class="avatar">
      <img :src="user.avatar" alt="">
    </div>
    <div class="desc">{{user.desc}}</div>
    <div class="chat"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  created () {
    console.log(this.$route.query.id)
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style>
.person-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
}
</style>
