<template>
  <div class="head-wrapper">
    <div class="head-left" @click="leftClick">
      <slot name="left"></slot>
    </div>
    <div class="title">{{this.title}}</div>
    <div class="head-right" @click="rightClick">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    leftClick () {
      this.$emit('leftClick')
    },
    rightClick () {
      this.$emit('rightClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.head-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 40px;
  padding: 5px 10px;
  line-height: 40px;
  background: white;
  .title {
    position: absolute;
    left: 50%;
    transform: translate3d(-50%,0,0);
    font-size: 20px;
    text-align: center;
  }
  .head-left {
    width: 40px;
    height: 40px;
    float: left;
  }
  .head-right {
    width: 40px;
    height: 40px;
    float: right;
  }
}
</style>
