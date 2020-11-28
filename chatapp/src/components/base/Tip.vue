<template>
  <div class="tip-wrapper" v-if="visible" @click.stop>
    <div class="mask"></div>
    <div class="content">
       {{content}}
    <div class="btn" @click="onClick">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onClick () {
      this.hide()
    },
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .tip-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .5;
      z-index: 0;
    }
    .content {
      width: 200px;
      height: 100px;
      border-radius: 10px;
      line-height: 70px;
      text-align: center;
      background: white;
      z-index: 1;
      .btn {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-top: 1px solid black;
      }
    }
  }
</style>
