<template>
  <span class="spot">{{count}}</span>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
  .spot {
    display: inline-block;
    width: 16px;
    height: 16px;
    padding: 2px;
    text-align: center;
    font-size: 14px;
    line-height: 16px;
    border-radius: 50%;
    background: red;
    color: #ffffff;
  }
</style>
