<template>
  <div class="list-item-wrapper">
    <div class="avatar-wrapper">
      <avatar :imgurl="avatar"></avatar>
    </div>
    <div class="list-item-content">
      <div class="name">{{name}}</div>
      <div class="description">{{desc}}</div>
    </div>
    <div class="list-item-extend">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script>
import Avatar from './Avatar'
export default {
  props: {
    avatar: {
      type: String
    },
    name: {
      type: String
    },
    desc: {
      type: String
    },
    uid: {
      type: String
    }
  },
  components: {
    Avatar
  }
}
</script>
<style lang="scss" scoped>
.list-item-wrapper {
  display: flex;
  height: 100%;
  padding: 4px 8px;
  position: relative;
  .avatar-wrapper {
    width: 50px;
    height: 50px;
  }
  .list-item-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    padding: 0 4px;
    .name {
      color: red;
    }
    .description {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #ccc;
    }
  }
  .list-item-extend {
    width: 60px;
    height: 50px;
  }
}
</style>
