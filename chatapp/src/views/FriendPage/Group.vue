<template>
    <div class="group-wrapper">
      <nav-head :title="title">
      </nav-head>
      <div class="group-list">
        <cube-scroll
        ref="scroll"
        :data="personList"
        :options="options"
        :scroll-events="['scroll']"
        @scroll="onScroll"
        @pulling-down="onPullingDown"
        >
        <template v-slot:pulldown="props">
          <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style="pullDownStyle">
            <div class="pulldown-content">
              <div v-if="props.beforePullDown">
                <span :class="pullDownY > 40 ? 'rotate arrow': 'arrow'">↓</span><span>{{pullDownTip}}</span>
              </div>
              <div v-else>
                <div v-if="props.isPullingDown">
                  <cube-loading class="load" :size="18"></cube-loading>
                  <span>正在刷新</span>
                </div>
                <div v-else>
                  <span>刷新成功</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <ul class="scroll-list" v-if="personList.length">
          <li v-for="personInfo in personList" :key="personInfo._id" @click="selectItem(personInfo)">
            <list-item :avatar="personInfo.avatar"
            :name="personInfo.nickname"
            :desc="personInfo.desc"
            :uid="personInfo._id"
            ></list-item>
          </li>
        </ul>
        <div class="no-content" v-else>
          还没有任何好友
        </div>
        </cube-scroll>
      </div>
    </div>
</template>
<script>
import ListItem from '_c/base/ListItem'
import NavHead from '_c/base/NavHead'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: '联系人',
      options: {
        pullDownRefresh: {
          threshold: 40,
          stop: 40,
          txt: '更新成功'
        }
      },
      pullDownY: 0,
      pullDownStyle: ''
    }
  },
  components: {
    ListItem,
    NavHead
  },
  created () {
    this.getPersonList()
  },
  computed: {
    pullDownTip () {
      if (this.pullDownY <= 40) {
        return '下拉刷新'
      } else {
        return '立即释放刷新'
      }
    },
    ...mapGetters(['personList'])
  },
  methods: {
    // 获取用户列表
    async getPersonList () {
      const res = await this.$store.dispatch('queryPersonList')
      if (res.code === 200) {
        this.$refs.scroll.forceUpdate()
      } else {
        this.$createToast({
          type: 'warn',
          txt: '获取失败',
          time: 1000
        })
        this.$refs.scroll.forceUpdate()
      }
    },
    selectItem (personInfo) {
      this.$router.push({
        name: 'PersonInfo',
        params: personInfo
      })
    },
    onPullingDown () {
      this.getPersonList()
    },
    onScroll (pos) {
      this.pullDownY = pos.y
      if (pos.y > 0) {
        this.pullDownStyle = `top: ${pos.y}px`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.group-wrapper {
  .group-list {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 50px;
    .cube-pulldown-wrapper {
      transform: translateY(-100%);
      top: 0;
      .pulldown-content {
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #666;
        font-size: 14px;
        .arrow {
          position: absolute;
          top: 0;
          left: 120px;
        }
        .load {
          position: absolute;
          top: 6px;
          left: 120px;
        }
        span {
          display: inline-block;
          transition: all 0.3s;
          color: #666;
          font-size: 14px;
          &.rotate {
            transform: rotate(180deg);
          }
        }
      }
    }
    .scroll-list {
    }
    .no-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      color: #ccc;
    }
  }
}
</style>
