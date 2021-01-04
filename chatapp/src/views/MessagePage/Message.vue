<template>
<div class="message-wrapper">
  <nav-head :title="title" class="nav" @leftClick="handleAvatarClick" @rightClick='onAdd'>
    <template v-slot:left>
      <div class="l-head">
        <avatar :imgurl="user.avatar"></avatar>
      </div>
    </template>
    <template v-slot:right>
      <div class="r-head">
        <i class="cubeic-add"></i>
      </div>
    </template>
  </nav-head>
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
            <div class="search">
              <input type="text" class="iconfont icon-search" :placeholder='placeholder'>
            </div>
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
  <cube-popup type="add-popup" ref="popup" :visible="showPopup" :maskClosable="true" position='right'>
    <div class="add-panel">
      <ul class="panel-list" @click="handlePanelClick">
        <li class="item" v-for="option in addOptionList" :key="option.id" :data-index="option.id"><i class="cubeic-person"></i>{{option.label}}</li>
      </ul>
    </div>
  </cube-popup>
  <router-view></router-view>
  </div>
</template>

<script>
import ListItem from '_c/base/ListItem'
import NavHead from '_c/base/NavHead'
import Avatar from '_c/base/Avatar'
import { mapGetters } from 'vuex'
// import service from '../util/service';
export default {
  data () {
    return {
      title: '消息',
      pullDownStyle: '',
      pullDownY: 0,
      message: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      placeholder: '\ue63c 搜索',
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
      },
      showPopup: false,
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
    NavHead,
    Avatar
  },
  created () {
    this.getMessage()
  },
  methods: {
    // 下拉刷新
    onPullingDown () {
      setTimeout(() => {
        if (Math.random() > 0.4) {
          this.message.unshift('0')
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    // 滑动控制下拉框提示
    onScrollHandle (pos) {
      this.pullDownY = pos.y
      this.pullDownStyle = `top:${pos.y}px`
    },
    // 获取消息
    getMessage () {
      console.log(this.$store.state.user)
      console.log('获取消息')
    },
    // btn点击
    onBtnsClick () {
      console.log('click')
    },
    // 消息项点击
    onItemClick (uid) {
      this.$router.push({
        path: '/chat',
        query: {
          uid
        }
      })
    },
    // 点击消息头像进入个人信息页
    handleAvatarClick () {
      this.$router.push({
        path: '/person',
        query: {
          id: this.user.id
        }
      })
    },
    // 点击添加按钮
    onAdd () {
      this.$refs.popup.show()
    },
    handlePanelClick (e) {
      const { index } = e.target.dataset
      // 2: 添加好友
      switch (index) {
        case '2':
          this.$router.push({
            path: '/message/searchPerson'
          })
          this.$refs.popup.hide()
          break
        default:
          this.$createDialog({
            type: 'alert',
            title: '尚未开发',
            content: '在做了在做了..（指新建文件夹）',
            icon: 'cubeic-question'
          }).show()
          break
      }
    }
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
  .r-head {
    width: 40px;
    height: 40px;
    text-align: center;
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
  .inner-content {
    .search {
      width: 100%;
      height: 40px;
      padding: 6px 10px;
      box-sizing: border-box;
      background-color: #ccc;
      input {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        outline: 0;
        padding: 0 10px;
        box-sizing: border-box;
        &::placeholder {
          text-align: center;
        }
      }
      .iconfont {
        font-size: 16px;
      }
    }
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
  .cube-add-popup {
    .add-panel {
      position: relative;
      padding: 10px 20px;
      margin: 50px 4px 0 0;
      border-radius: 4px;
      background: #fff;
      &::after {
        position: absolute;
        right: 20px;
        top: -19px;
        content: '';
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent #ffffff transparent;
      }
      .item {
        padding: 10px;
        font-size: 18px;
        i {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
