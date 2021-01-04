<template>
  <div class="person-wrapper">
    <nav-head ref="title" :class="[whiteStyle ? 'light' : '', 'title']" :title="title" @leftClick="back">
      <template v-slot:left>
        <i class="iconfont icon-arrow-left"></i>
      </template>
    </nav-head>
    <cube-scroll ref="scroll" class="info-wrapper"
    :style="{backgroundImage: `url(${imgurl})`}"
    :options='options'
    :scroll-events="['scroll']"
    @scroll="handleScroll"
    >
      <div ref="filter" :style ="{backgroundImage: `url(${imgurl})`}" class="filter" v-show="bgVisible"></div>
      <div class="main-info">
      <div class="avatar">
        <avatar :imgurl='imgurl'></avatar>
      </div>
      <div class="text">
        <div class="top">
          <div class="name">nihao</div>
          <div class="nickname">昵称</div>
        </div>
        <div class="bottom">
          <div class="account">123455677</div>
          <div class="level">10级</div>
        </div>
      </div>
      </div>
      <ul class="list" @click="_onRoute">
      <li class="list-item" data-index="0"><i class="iconfont icon-user"></i>
        基本信息
        <i class="cubeic-arrow"></i>
      </li>
      <li class="list-item" data-index="1"><i class="iconfont icon-user"></i>
        个性签名
        <i class="cubeic-arrow"></i>
      </li>
      <li class="list-item" data-index="2"><i class="iconfont icon-user"></i>
        个人空间
        <i class="cubeic-arrow"></i>
      </li>
      <li class="list-item" data-index="3"><i class="iconfont icon-user"></i>
        测试
        <i class="cubeic-arrow"></i>
      </li>
      </ul>
    </cube-scroll>
    <div class="tab">
      <div class="item" @click="console.log('未开发')">音频通话</div>
      <div class="item" @click="console.log('未开发')">送礼物</div>
      <div class="item" @click="_onChat">发消息</div>
    </div>
  </div>
</template>
<script>
import NavHead from '_c/base/NavHead'
import Avatar from '_c/base/Avatar'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      bgVisible: false,
      title: '',
      whiteStyle: false,
      imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1',
      options: {
        probeType: 3
      }
    }
  },
  created () {
    console.log(this.$route.query.id)
  },
  components: {
    NavHead,
    Avatar
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 改变标题样式
    changeTitleStyle () {
      this.title = '个人资料'
      this.whiteStyle = true
    },
    // 恢复标题样式
    resetTitleStyle () {
      this.title = ''
      this.whiteStyle = false
    },
    // 回退
    back () {
      this.$router.go(-1)
    },
    // 跳转
    _onRoute (e) {
      const type = e.target.dataset.index
      if (type === '0') {
        console.log('跳转至详情页')
      } else if (type === '1') {
        console.log('跳转至个性签名')
      } else if (type === '2') {
        console.log('跳转至个人空间')
      }
    },
    // 发送消息
    _onChat () {
      console.log('发送消息')
    },
    // 监听滚动事件
    handleScroll (pos) {
      const scrollY = pos.y
      if (scrollY < 0) {
        this.bgVisible = true
        // 45 为 距离标题的高度
        if (scrollY < -45) {
          this.changeTitleStyle()
        } else {
          this.resetTitleStyle()
        }
      } else {
        this.resetTitleStyle()
        this.bgVisible = false
        const percent = 1 + scrollY / 375
        this.$refs.scroll.$el.style.backgroundSize = `${percent * 100}%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.person-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background:#fff;
  .title {
    z-index: 50;
    background-color: rgba(247, 247, 247, 0);
    color: #fff;
    transition: all 0.4s;
    .icon-arrow-left {
      font-size: 40px;
    }
    &.light {
      background-color:  rgba(247, 247, 247, 1);
      color: #000;
    }
  }
  .info-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 667px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: top center;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 160px;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .main-info {
      position: absolute;
      top: 95px;
      left: 0;
      width: 100%;
      height: 110px;
      display: flex;
      padding: 10px;
      .avatar {
        width: 110px;
        height: 100%;
        margin-right: 20px;
      }
      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        .top {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          color: white;
          .name {
            font-size: 28px;
          }
        }
        .bottom {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
    .list {
      margin-top: 160px;
      height: 600px;
      padding-top: 65px;
      background: #fff;
      .list-item {
        height: 20px;
        padding: 8px;
        line-height: 20px;
      i {
        margin-right: 10px;
      }
      .cubeic-arrow {
        float: right;
      }
    }
    }
  }
  .tab {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    padding: 10px;
    z-index: 100;
    .item {
      flex: 1;
      border-radius: 10px;
      margin: 0 10px;
      text-align: center;
      line-height: 40px;
      background-color: #5bc0de;
      color: white;
    }
  }
}
</style>
