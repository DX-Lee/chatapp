<template>
 <div class="mine-wrapper">
    <nav-head :title="title" class='top' ref="top" @rightClick="publish">
      <template v-slot:right>
        <i class="iconfont icon-icon_add"></i>
      </template>
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
           <span v-if="props.isPullingDown">正在加载</span>
           <span v-else>加载成功</span>
         </template>
       </div>
     </div>
   </template>
   <template v-slot:pullup="props">
     <div class="cube-pullup-wrapper">
       <cube-loading v-if="props.isPullUpLoad"></cube-loading>
       <span v-else>没有更多了</span>
     </div>
   </template>
    <div class="mine-content">
      <div class="bg" :style="bgStyle">
        <div class="pic">
          <avatar :imgurl="user.avatar"></avatar>
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
import PostItem from '_c/postItem/postItem'
import service from '_u/service'
import formatTime from '_u/formatTime'
export default {
  data () {
    return {
      title: '我的',
      postList: [],
      pullDownStyle: '',
      options: {
        probeType: 3,
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '刷新成功'
        },
        pullUpLoad: {
          more: '加载更多',
          noMore: '没有更多了'
        }
      },
      scrollEvents: [
        'scroll'
      ],
      initialIndex: 0, // 用来获取点击图片所在的索引
      pageStart: 0, // 数据起始索引页
      hasMore: true
    }
  },
  computed: {
    bgStyle () {
      return {
        backgroundImage: `url(${this.user.bgUrl})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%'
      }
    },
    ...mapGetters([
      'user'
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
        this.fetchData()
      }
    },
    // 初始化数据
    initPostData () {
      this.fetchData()
    },
    // 获取数据
    async fetchData () {
      const res = await service.get('post/getpostlist')
      if (res && res.code === 200) {
        const result = res.result
        if (result.length === 0) {
          this.hasMore = false
        }
        this.postList = this.formatData(result)
      } else {
        console.log('获取数据失败')
      }
    },
    // 点击发表动态
    publish () {
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
      this.pageStart = 0
      this.fetchData()
    },
    // 上拉加载
    async onPullingUp () {
      if (this.hasMore) {
        const res = await service.get('post/getpostlist', {
          pageStart: this.pageStart + 1
        })
        if (res && res.code === 200) {
          const dataList = res.result
          if (dataList.length === 0) {
            this.hasMore = false
          } else {
            this.postList = this.postList.concat(this.formatData(dataList))
            this.pageStart = this.pageStart + 1
          }
        }
      }
      this.$refs.scroll.forceUpdate()
    },
    // 格式化数据
    formatData (data) {
      const ret = []
      data.forEach((item) => {
        ret.push({
          id: item._id,
          nickname: item.user.nickname,
          avatar: item.user.avatar,
          content: item.content,
          picList: item.picList,
          likeList: item.likeList,
          comments: item.comments,
          isLike: item.isLike,
          userInfo: item.user,
          time: formatTime(new Date(item.create).getTime())
        })
      })
      return ret
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
    .bg {
      position: relative;
      height: 200px;
      .pic {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 20px;
        bottom: 20px;
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
