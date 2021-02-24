<template>
  <div class="head-wrapper">
    <div class="head-left" @click="leftClick">
      <slot name="left"></slot>
    </div>
    <div class="title">
      <slot>{{title}}</slot>
    </div>
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
  display: flex;
  height: 40px;
  padding: 5px 10px;
  line-height: 40px;
  background: #f7f7f7;
  .title {
    flex: 1;
    text-align: center;
  }
  .head-left {
    width: 40px;
    height: 40px;
  }
  .head-right {
    width: 40px;
    height: 40px;
  }
}
</style>
