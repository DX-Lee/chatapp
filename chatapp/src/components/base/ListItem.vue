<template>
  <div class="content-wrapper" @click="onClick">
    <div class="avatar-wrapper">
      <avatar :imgurl="data.imgurl"></avatar>
    </div>
    <div class="content">
      <div class="name">{{data.name}}</div>
      <div class="description">{{data.desc}}</div>
    </div>
    <div class="extend">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script>
import Avatar from 'components/base/Avatar'
export default {
  props: {
    // 传进的基本数据
    data: Object
  },
  data () {
    return {}
  },
  methods: {
    onClick () {
      this.$emit('selectItem', this.data.id)
    }
  },
  components: {
    Avatar
  }
}
</script>
<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  height: 100%;
  padding: 4px 8px;
  position: relative;
  .avatar-wrapper {
    width: 50px;
    height: 50px;
  }
  .content {
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
  .extend {
    width: 50px;
    height: 50px;
  }
}
</style>
