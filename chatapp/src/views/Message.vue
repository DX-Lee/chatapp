<template>
<div class="message-wrapper">
  <my-head :title="title" class="nav" @leftClick="handleAvatarClick">
    <template v-slot:left>
      <div class="l-head">
        <avatar :imgurl="user.avatar"></avatar>
      </div>
    </template>
  </my-head>
  <div class="message-content">
      <cube-scroll ref="scroll" :data="message" :options="scrollOptions" :scroll-events="['scroll']" @pulling-down="onPullingDown" @scroll="onScrollHandle">
         <template v-slot:pulldown="props">
          <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style="pullDownStyle">
            <div class="pulldown-content">
              <span v-if="props.beforePullDown">{{pullDownTip}}</span>
              <template v-else>
                <span v-if="props.isPullingDown">正在更新..</span>
                <span v-else>更新完成</span>
              </template>
            </div>
          </div>
        </template>
        <div class="inner-content">
          <cube-swipe>
            <ul>
              <li v-for="(data, index) in swipeData" :key="data.item.id" class="item">
                <cube-swipe-item :btns="data.btns"
                @btn-click="onBtnsClick"
                :index="index"
                >
                  <list-item :data="data.item"
                  @selectItem="onItemClick"
                  :uid="data.item.id"
                  >
                    <template v-slot:extra>
                      <div class="timer">
                        18:00
                      </div>
                    </template>
                  </list-item>
                </cube-swipe-item>
              </li>
            </ul>
          </cube-swipe>
        </div>
      </cube-scroll>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListItem from 'components/base/ListItem'
import MyHead from 'components/base/MyHead'
import Avatar from 'components/base/Avatar'
import { mapGetters } from 'vuex'
// import service from '../util/service';
export default {
  data () {
    return {
      title: '消息',
      pullDownStyle: '',
      pullDownY: 0,
      message: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      swipeData: [
        {
          item: {
            id: '3646653877',
            name: '还不是因为你长得不好看',
            desc: '伤感：歌词再狠，也抵不过现实伤人',
            imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
          },
          btns: [
            {
              action: 'clear',
              text: '不再关注',
              color: '#c8c7cd'
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        },
        {
          item: {
            id: '1789676645',
            name: '秋水浮萍任飘渺',
            desc: '武侠配乐』快意恩仇江湖情',
            imgurl: 'http://p.qpic.cn/music_cover/8KfvDey9cibtZ5xkWxRic6vhXgdPic3wnB7reibI4pdPQBCP8u57uqcjsQ/600?n=1'
          },
          btns: [
            {
              action: 'clear',
              text: '不再关注',
              color: '#c8c7cd'
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        },
        {
          item: {
            id: '3649034125',
            name: '念葳蕊',
            desc: '江海迦：热恋后哼一首歌为自己悲悯的歌',
            imgurl: 'http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1'
          },
          btns: [
            {
              action: 'clear',
              text: '不再关注',
              color: '#c8c7cd'
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        }
      ],
      scrollOptions: {
        pullDownRefresh: {
          threshold: 40,
          stop: 40,
          txt: '更新成功'
        }
      }
    }
  },
  computed: {
    pullDownTip () {
      if (this.pullDownY <= 40) {
        return '下拉刷新...'
      } else {
        return '释放刷新...'
      }
    },
    ...mapGetters(['user'])
  },
  components: {
    ListItem,
    MyHead,
    Avatar
  },
  methods: {
    onPullingDown () {
      setTimeout(() => {
        if (Math.random() > 0.4) {
          this.message.unshift('0')
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    onScrollHandle (pos) {
      this.pullDownY = pos.y
      this.pullDownStyle = `top:${pos.y}px`
    },
    getMessage () {
      console.log(this.$store.state.user)
      console.log('获取消息')
    },
    onBtnsClick () {
      console.log('click')
    },
    onItemClick (uid) {
      this.$router.push({
        path: '/chat',
        query: {
          uid
        }
      })
    },
    handleAvatarClick () {
      this.$router.push({
        path: '/person',
        query: {
          id: this.user.id
        }
      })
    }
  },
  created () {
    this.getMessage()
  }
}
</script>
<style lang="scss" scoped>
.message-wrapper {
  .nav {
    border-bottom: 1px solid #ccc;
  }
  .l-head {
    width: 40px;
    height: 40px;
  }
.message-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 50px;
  .iconfont {
    font-size: 30px;
  }
    .cube-pulldown-wrapper {
      transform: translateY(-100%);
      line-height: 0;
      top: 0px;
      .pulldown-content {
        width: 100%;
        span {
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
        }
      }
    }
      .item {
        height: 60px;
        }
        .timer {
          height: 100%;
        }
  }
}
</style>
