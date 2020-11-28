<template>
    <div class="avatar"><img :src="imgurl" alt=""></div>
</template>
<script>
export default {
  props: {
    imgurl: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar {
  overflow: hidden;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
