<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
  <div class="add-panel" v-if="isShow">
    <div ref="mask" class="add-panel-mask" @click="hide"></div>
    <div ref="container" class="add-panel-container">
      <ul class="add-panel-list">
        <li class="add-panel-list-item" :class="{active: currentIndex === index}" v-for="(item, index) in addOptionList" :key="item.id"
          @click.prevent="selectItem(item)" @touchstart="start(index)" @touchend="end"
        >
        {{item.label}}
        </li>
      </ul>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      list: [],
      currentIndex: -1,
      addOptionList: [
        {
          id: 1,
          label: '创建群聊'
        },
        {
          id: 2,
          label: '添加好友'
        },
        {
          id: 3,
          label: '匹配聊天'
        },
        {
          id: 4,
          label: '一起派对'
        },
        {
          id: 5,
          label: '扫一扫'
        },
        {
          id: 6,
          label: '更多'
        }
      ]
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    },
    selectItem (item) {
      if (item.label === '添加好友') {
        this.$router.push({
          path: '/search'
        })
      } else {
        this.$createDialog({
          type: 'alert',
          title: '尚未开发',
          icon: 'cubeic-question'
        }).show()
      }
    },
    start (index) {
      this.currentIndex = index
    },
    end () {
      this.currentIndex = -1
    },
    beforeEnter () {
      this.$refs.mask.style.opacity = '0'
      this.$refs.container.style.transform = 'scale(0)'
    },
    enter (el, done) {
      // 触发重绘
      this._reflow = el.offsetHeight

      this.$refs.mask.style.opacity = '0.4'
      this.$refs.container.style.transform = 'scale(1)'
      this.$refs.mask.style.transition = 'all 0.5s ease'
      this.$refs.container.style.transition = 'all 0.5s ease'
      this.$refs.mask.addEventListener('transitionend', done)
      this.$refs.container.addEventListener('transitionend', done)
    },
    afterEnter () {
      this.$refs.mask.style.transition = ''
      this.$refs.container.style.transition = ''
    },
    leave (el, done) {
      this.$refs.mask.style.transition = 'all 0.5s ease'
      this.$refs.container.style.transition = 'all 0.5s ease'
      this.$refs.mask.style.opacity = '0'
      this.$refs.container.style.transform = 'scale(0)'
      this.$refs.mask.addEventListener('transitionend', done)
      this.$refs.container.addEventListener('transitionend', done)
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .add-panel-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #25262d;
    }
    .add-panel-container {
      position: absolute;
      top: 50px;
      right: 4px;
      background: #ffffff;
      border-radius: 4px;
      transform-origin: right top;
      .add-panel-list {
        width: 120px;
        .add-panel-list-item {
          padding: 10px 10px;
          &.active {
            background: #ccc;
          }
        }
      }
      &::after {
        position: absolute;
        right: 20px;
        top: -19px;
        content: '';
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent #ffffff transparent;
      }
    }
  }
</style>
