<template>
    <div class="group-wrapper">
      <my-head :title="title">
      </my-head>
      <div class="group-list">
        <cube-index-list :data="cityData">
          <cube-index-list-group
            v-for="(group, index) in cityData"
            :key="index"
            :group="group"
          >
            <cube-index-list-item v-for="(item, index) in group.items"
            :key="index"
            :item="item"
            @select="selectItem"
            >
             <list-item :data="item"></list-item>
            </cube-index-list-item>
          </cube-index-list-group>
        </cube-index-list>
      </div>
    </div>
</template>
<script>
import ListItem from 'components/base/ListItem'
import MyHead from 'components/base/MyHead'
const cityData = [
  {
    name: 'A',
    items: [
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      }
    ]
  },
  {
    name: 'B',
    items: [
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      }
    ]
  },
  {
    name: 'C',
    items: [
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      }
    ]
  },
  {
    name: 'D',
    items: [
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      }
    ]
  },
  {
    name: 'e',
    items: [
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      },
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      }
    ]
  },
  {
    name: 'f',
    items: [
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      }
    ]
  },
  {
    name: 'G',
    items: [
      {
        id: '3646653877',
        name: '还不是因为你长得不好看',
        desc: '伤感：歌词再狠，也抵不过现实伤人',
        imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
      }
    ]
  }
]
export default {
  data () {
    return {
      title: '联系人',
      cityData: cityData
    }
  },
  components: {
    ListItem,
    MyHead
  },
  methods: {
    selectItem (data) {
      console.log(data)
    },
    handleAvatarClick () {
      console.log('avatarclick')
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
    overflow: hidden;
      .item {
        display: flex;
        height: 40px;
        padding: 5px 10px;
        .avatar {
          width: 40px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0 10px;
          justify-content: space-between;
          overflow: hidden;
          font-size: 16px;
          p {
            font-size: 14px;
            color: #ccc;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
  }
}
</style>
