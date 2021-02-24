<template>
    <svg class="icon" aria-hidden="true" :style="svgStyle">
      <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '16'
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgStyle () {
      return `width: ${this.size}px;height: ${this.size}px`
    }
  }
}
</script>

<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
