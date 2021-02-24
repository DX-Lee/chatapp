<template>
  <div class="tab">
    <router-link tag="div" class="item" to="/message" v-slot="{ isActive, href, navigate, route }">
    <div :class="isActive ? 'bounce' : ''" @animationend='changeIcon(route)'>
      <a class="link" :href="href" @click="navigate">
          <svg-icon class="link-icon" @click='changeIcon(route)' :icon-class='messageIcon' size='40'></svg-icon>
          <div class="message-count" v-if="totalCount">
            <spot :count="totalCount"></spot>
          </div>
      </a>
    </div>
    </router-link>
    <router-link tag="div" class="item" to="/group" v-slot="{ isActive, href, navigate, route}">
    <div :class="isActive ? 'bounce' : ''" @animationend='changeIcon(route)'>
      <a class="link" :href="href" @click="navigate">
          <svg-icon class="link-icon" :icon-class='peopleIcon' size='40'></svg-icon>
      </a>
    </div>
    </router-link>
    <router-link tag="div" class="item" to="/post" v-slot="{ isActive, href, navigate, route}">
    <div :class="isActive ? 'bounce' : ''" @animationend='changeIcon(route)'>
      <a class="link" :href="href" @click="navigate">
          <svg-icon class="link-icon" :icon-class='postIcon' size='40'></svg-icon>
      </a>
    </div>
    </router-link>
  </div>
</template>

<script>
import Spot from '_c/base/Spot'
export default {
  data () {
    return {
      messageIcon: 'xiaoxi',
      peopleIcon: 'people',
      postIcon: 'xinqiu'
    }
  },
  components: {
    Spot
  },
  computed: {
    totalCount () {
      const sessionList = this.$store.state.sessionList
      let total = 0
      sessionList.forEach(session => {
        total += session.newMsgCount
      })
      return total
    }
  },
  methods: {
    changeIcon (route) {
      if (route.path === '/message') {
        this.messageIcon = 'xiaoxi-active'
        this.peopleIcon = 'people'
        this.postIcon = 'xinqiu'
      } else if (route.path === '/group') {
        this.peopleIcon = 'people-active'
        this.messageIcon = 'xiaoxi'
        this.postIcon = 'xinqiu'
      } else if (route.path === '/post') {
        this.postIcon = 'xinqiu-active'
        this.messageIcon = 'xiaoxi'
        this.peopleIcon = 'people'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bounce {
  animation: bounce 0.2s;
}
@keyframes bounce {
  0% {
    transform: scale(1)
  }
  50% {
    transform: scale(0.5)
  }
  100% {
    transform: scale(1)
  }
}
.scale-leave-active {
  transition: all 0.1s
}
.scale-leave-to{
  transform: scale(0.4)
}
.swell-enter-active {
  transition: all 0.1s 0.1s
}
.swell-enter {
  transform: scale(0)
}
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
      .link {
        display: inline-block;
        position: relative;
        width: 40px;
        height: 40px;
        .message-count {
          position: absolute;
          top: 0;
          right: 0;
        }
        .link-icon {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
}
</style>>
