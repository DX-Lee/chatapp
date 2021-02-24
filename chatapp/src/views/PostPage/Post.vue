<template>
 <div class="mine-wrapper">
    <nav-head :title="title" class='top' ref="top">
    </nav-head>
   <cube-scroll
   ref="scroll"
   :data='postList'
    @scroll="onScroll"
    :options='options'
    :scrollEvents='scrollEvents'
    @pulling-down='onPullingDown'
    @pulling-up='onPullingUp'
   >
   <template v-slot:pulldown="props">
     <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style='pullDownStyle'>
       <div class="pulldown-content">
         <span v-if="props.beforePullDown" class="load">下拉刷新</span>
         <template v-else>
           <span v-if="props.isPullingDown">正在刷新</span>
           <span v-else>刷新成功</span>
         </template>
       </div>
     </div>
   </template>
   <template v-slot:pullup="props">
     <div class="cube-pullup-wrapper">
       <cube-loading v-if="props.isPullUpLoad"></cube-loading>
       <span v-else>到底啦</span>
     </div>
   </template>
    <div class="mine-content">
      <div class="backgroundPic">
        <div class="pic">
          <avatar :imgurl="user.avatar"></avatar>
        </div>
      </div>
      <div class="option-list">
        <div class="option" @click="onRoutePublishPage">
          <i class="iconfont icon-message"></i>
          <p>说说</p>
        </div>
      </div>
      <div v-if="postList.length" class="list">
          <ul>
            <li v-for="post in postList" :key="post._id">
              <post-item :postData="post" @imgSelect="handleImgSelect"></post-item>
              <div class="separator"></div>
            </li>
          </ul>
      </div>
      <div v-else class="no-content">这里空空如也</div>
    </div>
   </cube-scroll>
   <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavHead from '_c/base/NavHead'
import Avatar from '_c/base/Avatar'
import PostItem from '_c/postItem/PostItem'
export default {
  data () {
    return {
      title: '我的',
      pullDownStyle: '',
      options: {
        probeType: 3,
        pullDownRefresh: {
          threshold: 60,
          stop: 40
        },
        pullUpLoad: {
          more: '加载更多',
          noMore: '到底啦'
        }
      },
      scrollEvents: [
        'scroll'
      ],
      initialIndex: 0, // 用来获取点击图片所在的索引
      pageStart: 0, // 数据起始索引页
      pageSize: 5,
      hasMore: true
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'postList'
    ])
  },
  components: {
    NavHead,
    Avatar,
    PostItem
  },
  watch: {
    $route: 'refresh'
  },
  methods: {
    refresh () {
      if (this.$route.params.ispublish) {
        this.pageStart = 0
        this.fetchData()
      }
    },
    // 初始化数据
    initPostData () {
      this.fetchData()
    },
    // 获取数据
    async fetchData () {
      const res = await this.$store.dispatch('queryPostList', {
        pageStart: this.pageStart,
        pageSize: this.pageSize
      })
      if (res && res.code === 200) {
        const result = res.result
        if (result.length === 0) {
          this.hasMore = false
        }
      } else {
        this.$createToast({
          type: 'warn',
          txt: '刷新失败',
          time: 1000
        }).show()
      }
    },
    // 点击跳转到发表动态页
    onRoutePublishPage () {
      this.$router.push({
        path: '/post/publish'
      })
    },
    // 监听滚动
    onScroll (pos) {
      const opacity = Math.min(-pos.y / 200, 1)
      this.$refs.top.$el.style.backgroundColor = `rgba(247,247,247,${opacity})`
      if (pos.y > 0) {
        this.pullDownStyle = `top: ${pos.y}px`
      }
    },
    // 展示图片预览组件
    handleImgSelect (list, index) {
      this.initialIndex = index
      this.$createImagePreview({
        $props: {
          imgs: list,
          initialIndex: 'initialIndex',
          loop: false
        },
        $events: {
          change: (i) => {
            this.initialIndex = i
          }
        }
      }).show()
    },
    // 下拉刷新
    async onPullingDown () {
      this.hasMore = true
      this.pageStart = 0
      this.fetchData()
    },
    // 上拉加载
    async onPullingUp () {
      if (this.hasMore) {
        const res = await this.$store.dispatch('queryPostList', {
          pageStart: this.pageStart + 1,
          pageSize: this.pageSize
        })
        if (res && res.code === 200) {
          const dataList = res.result
          if (dataList.length === 0) {
            this.hasMore = false
          } else {
            this.pageStart = this.pageStart + 1
          }
        }
      }
      this.$refs.scroll.forceUpdate(true)
    }
  },
  created () {
    this.initPostData()
  }
}
</script>
<style lang="scss" scoped>
.mine-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  .top {
    z-index: 50;
    background-color: rgba(247, 247, 247, 0);
    .icon-icon_add {
      font-size: 26px;
    }
  }
  .cube-pulldown-wrapper {
    transform: translateY(-100%);
    .pulldown-content {
      span {
        position: absolute;
        bottom: 10px;
        right: 0;
        left: 0;
        text-align: left;
      }
    }
  }
  .cube-pullup-wrapper {
    padding: 5px 0;
    span {
      color: #ccc;
    }
  }
  .mine-content {
    .backgroundPic {
      position: relative;
      height: 200px;
      background: url('https://justchat.oss-cn-beijing.aliyuncs.com/public/bg.jpg') no-repeat center top/cover;
      .pic {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 20px;
        bottom: 20px;
      }
    }
    .option-list {
      display: flex;
      height: 50px;
      padding: 0 20px;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .option {
        font-size: 12px;
        .icon-message {
          font-size: 24px;
        }
      }
    }
    .list {
      .separator {
        height: 10px;
        background-color: #f7f7f7;
      }
    }
    .no-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      color: #ccc;
    }
  }
}
</style>
