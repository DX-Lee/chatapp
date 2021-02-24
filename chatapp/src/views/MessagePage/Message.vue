<template>
<div class="message-wrapper">
  <nav-head :title="title" @leftClick="handleAvatarClick" @rightClick='onAdd'>
    <template v-slot:left>
      <div class="l-head">
        <avatar :imgurl="user.avatar"></avatar>
      </div>
    </template>
    <template v-slot:right>
      <div class="r-head">
        <i class="iconfont icon-icon_add"></i>
      </div>
    </template>
  </nav-head>
  <div class="message-content">
      <cube-scroll ref="scroll" :data="message" :options="scrollOptions" :scroll-events="['scroll']" @pulling-down="onPullingDown" @scroll="onScrollHandle">
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
        <div class="inner-content">
          <cube-swipe>
            <div class="search-wrapper">
              <input type="text" class="search iconfont icon-search" :placeholder='placeholder'>
            </div>
            <ul v-if="sessionList.length" class="chat-list">
              <li v-for="(session,index) in sessionList" :key="session._id" class="item">
                  <cube-swipe-item
                    ref="swipeItem"
                    :btns='swipeBtns'
                    :index='index'
                    @btn-click='onBtnClick'
                    :autoShrink="true"
                  >
                  <div  @click="onItemClick(session.personInfo, session.newMsgCount)">
                  <list-item :avatar="session.personInfo.avatar"
                  :name="session.personInfo.nickname"
                  :desc="session.lastMessage"
                  :uid="session.chatId"
                  >
                    <template v-slot:extra>
                      <div class="extend">
                        <div class="time">
                          {{session.lastMsgTime}}
                        </div>
                        <div v-if="session.newMsgCount">
                          <spot :count="session.newMsgCount"></spot>
                        </div>
                      </div>
                    </template>
                  </list-item>
                  </div>
                  </cube-swipe-item>
              </li>
            </ul>
            <div class="no-content" v-else>
               暂时还没有新消息
            </div>
          </cube-swipe>
        </div>
      </cube-scroll>
  </div>
  <add-panel ref="addPanel"></add-panel>
  <side-bar ref="sideBar"></side-bar>
  </div>
</template>

<script>
import ListItem from '_c/base/ListItem'
import NavHead from '_c/base/NavHead'
import Avatar from '_c/base/Avatar'
import Spot from '_c/base/Spot'
import AddPanel from '_c/addPanel/AddPanel'
import SideBar from '_c/sideBar/SideBar'
import { formatChatListTime } from '_u/formatTime'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      title: '消息',
      pullDownStyle: '',
      pullDownY: 0,
      message: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      placeholder: '\ue63c 搜索',
      scrollOptions: {
        pullDownRefresh: {
          threshold: 40,
          stop: 40,
          txt: '更新成功'
        }
      },
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
      ],
      swipeBtns: [
        {
          action: 'top',
          text: '置顶',
          color: '#999'
        },
        {
          action: 'delete',
          text: '删除',
          color: '#f00'
        }
      ]
    }
  },
  computed: {
    pullDownTip () {
      if (this.pullDownY <= 40) {
        return '下拉刷新'
      } else {
        return '释放立即刷新'
      }
    },
    ...mapGetters(['user', 'sessionList'])
  },
  components: {
    ListItem,
    NavHead,
    Avatar,
    AddPanel,
    SideBar,
    Spot
  },
  created () {
    this.getSessionList()
  },
  mounted () {
    this.$bus.$on('receiveNewMessage', (data) => {
      const {
        chatId,
        content,
        fromUser,
        create
      } = data
      const list = this.sessionList.slice()
      const index = list.findIndex((session) => {
        return session.chatId === chatId
      })
      if (index > -1) {
        const oldSession = list[index]
        list.splice(index, 1, {
          personInfo: fromUser,
          lastMessage: content,
          lastMsgTime: formatChatListTime(new Date(create).getTime()),
          chatId,
          newMsgCount: oldSession.newMsgCount + 1
        })
      } else {
        // 新会话
        list.unshift({
          personInfo: fromUser,
          lastMessage: content,
          lastMsgTime: formatChatListTime(new Date(create).getTime()),
          chatId,
          newMsgCount: 1
        })
      }
      this.setSessionList(list)
    })
  },
  beforeDestroy () {
    this.$bus.$off('receiveNewMessage')
  },
  methods: {
    // 下拉刷新
    onPullingDown () {
      this.getSessionList()
    },
    // 控制下拉显示
    onScrollHandle (pos) {
      this.pullDownY = pos.y
      if (this.pullDownY > 0) {
        this.pullDownStyle = `top:${pos.y}px`
      }
    },
    // 获取消息列表
    async getSessionList () {
      const res = await this.$store.dispatch('querySessionList')
      if (res.code === 200) {
        // console.log(res)
      }
      this.$refs.scroll.forceUpdate()
    },
    // 列表项按钮点击
    onBtnClick (btn, index) {
      const list = this.sessionList.slice()
      const session = list.splice(index, 1)[0]
      if (btn.action === 'top') {
        // 置顶
        list.unshift(session)
      } else {
        // 删除
        this.$store.dispatch('deleteSession', {
          index,
          chatId: session.chatId
        })
      }
      this.setSessionList(list)
    },
    // 消息项点击
    onItemClick (personInfo, newMsgCount) {
      this.$router.push({
        name: 'Chat',
        params: {
          personInfo,
          newMsgCount
        }
      })
    },
    // 点击消息头像弹出侧边栏
    handleAvatarClick () {
      this.$refs.sideBar.show()
    },
    // 点击添加按钮
    onAdd () {
      this.$refs.addPanel.show()
    },
    ...mapMutations({
      setSessionList: 'SET_SESSIONLIST'
    })
  }
}
</script>
<style lang="scss" scoped>
.message-wrapper {
  .l-head {
    width: 40px;
    height: 40px;
  }
  .r-head {
    width: 40px;
    height: 40px;
    text-align: center;
    .iconfont {
      font-size: 20px;
    }
  }
  .message-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 50px;
    background: #f7f7f7;
  .iconfont {
    font-size: 30px;
  }
  .inner-content {
    background: #ffffff;
    .search-wrapper {
      height: 40px;
      padding: 6px 10px;
      box-sizing: border-box;
      background-color: #f7f7f7;
      .search {
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
    .chat-list {
      .extend {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .time {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .no-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      color: #ccc;
    }
  }
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
  }
}
</style>
