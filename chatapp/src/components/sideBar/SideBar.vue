<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
  <div class="sideBar" v-if="isShow">
    <div ref="mask" class="sideBar-mask" @click="hide"></div>
    <div ref="menu" class="sideBar-menu">
      <div class="sideBar-menu-top">
         <div class="avatar-wrapper">
          <avatar :imgurl="user.avatar"></avatar>
        </div>
        <div class="description-wrapper">
          <p class="username">{{user.nickname}}</p>
          <p class="signature">{{user.desc}}</p>
        </div>
      </div>
      <div class="sideBar-menu-list">
        <div class="edit-item" @click="editInformation">
          <span>编辑资料</span>
          <span class="iconfont icon-arrow-right"></span>
        </div>
      </div>
      <div class="exit-btn">
        <span class="iconfont icon-tuichu"></span>
        <span class="exit" @click="exit">
          退出登录
        </span>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import Avatar from '_c/base/Avatar'
import Storage from '_u/storage'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {
    Avatar
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    },
    beforeEnter () {
      this.$refs.mask.style.opacity = '0'
      this.$refs.menu.style.transform = 'translate3d(-100%,0,0)'
    },
    enter (el, done) {
      // 触发重绘
      this._reflow = el.offsetHeight
      this.$refs.mask.style.opacity = '0.4'
      this.$refs.menu.style.transform = 'translate3d(0,0,0)'
      this.$refs.mask.style.transition = 'all 0.5s ease'
      this.$refs.menu.style.transition = 'all 0.5s ease'
      this.$refs.mask.addEventListener('transitionend', done)
      this.$refs.menu.addEventListener('transitionend', done)
    },
    afterEnter () {
      this.$refs.mask.style.transition = ''
      this.$refs.menu.style.transition = ''
    },
    leave (el, done) {
      this.$refs.mask.style.transition = 'all 0.5s ease'
      this.$refs.menu.style.transition = 'all 0.5s ease'
      this.$refs.mask.style.opacity = '0'
      this.$refs.menu.style.transform = 'translate3d(-100%,0,0)'
      this.$refs.mask.addEventListener('transitionend', done)
      this.$refs.menu.addEventListener('transitionend', done)
    },
    editInformation () {
      this.$router.push({
        path: 'edit'
      })
    },
    exit () {
      this.$createDialog({
        type: 'confirm',
        title: '是否退出登录?',
        content: '退出后将需要重新登录',
        confirmBtn: {
          text: '确定退出',
          active: true
        },
        cancelBtn: {
          text: '取消',
          active: false
        },
        onConfirm: () => {
          Storage.$store.remove('currentAccount')
          this.$router.push({
            name: 'Login'
          })
        }
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped>
  .sideBar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    .sideBar-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #25262d;
      opacity: 0.5;
    }
    .sideBar-menu {
      position: absolute;
      width: 200px;
      height: 100%;
      background: #ffffff;
      .sideBar-menu-top {
        display: flex;
        padding: 20px 0 20px 4px;
        border-bottom: 1px solid #ccc;
        .avatar-wrapper {
          width: 60px;
          height: 60px;
        }
        .description-wrapper {
          flex: 1;
          padding-left: 4px;
          overflow: hidden;
          .username {
            height: 30px;
          }
          .signature {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: 10px;
            font-size: 12px;
          }
        }
      }
      .sideBar-menu-list {
        .edit-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 10px;
        }
      }
      .exit-btn {
        display: flex;
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
        justify-content: center;
        .exit {
          color: red;
          text-align: center
        }
      }
    }
  }
</style>
