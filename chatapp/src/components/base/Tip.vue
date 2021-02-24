<template>
  <transition name="slide">
  <div class="tip-wrapper" v-if="visible">
    <div class="tip-avatar">
      <img class="avatar" :src="information.avatar" alt="">
    </div>
    <div class="tip-content">
      <div class="name">{{information.username}}</div>
      <div class="message">{{information.message}}</div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  props: {
    information: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      delay: 1000
    }
  },
  methods: {
    show () {
      this.visible = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.visible = false
      }, this.delay)
    },
    hide () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-100%)
}
  .tip-wrapper {
    display: flex;
    position: fixed;
    top: 10px;
    right: 10px;
    left: 10px;
    height: 50px;
    padding: 4px;
    z-index: 9999;
    background: #ffffff;
    border-bottom: 1px solid rgba(223,225,229,0);
    border-radius: 4px;
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    .tip-avatar {
      width: 50px;
      height: 50px;
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .tip-content {
      flex: 1;
      display: flex;
      margin-left: 20px;
      padding: 4px 0;
      flex-direction: column;
      justify-content: space-between;
      .message {
        color: #666;
      }
    }
  }
</style>
