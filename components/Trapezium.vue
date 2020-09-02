<template>
  <div
    class="trapezium"
    :class="[typeClass, isHoverLink ? hoverClass : '']"
    @mouseover="onHover"
    @mouseleave="onHoverOut"
  ></div>
</template>

<style scoped lang="scss">
.trapezium {
  width: 6.5vw;
  height: 9.5vw;
  transform: skewX(-47deg);
  transition: transform 0.1s ease-in;
  will-change: transform;
  cursor: pointer;
  &--spotify {
    background: $color-white;
    &--hover {
      transform: translate3d(4.55vw, -1.9vw, 0) skewX(-47deg);
      transition: transform 0.1s ease-out;
    }
  }
  &--fanbox {
    background: $color-gray;
    &--hover {
      transform: translate3d(0, -1.9vw, 0) skewX(-47deg);
      transition: transform 0.1s ease-out;
    }
  }
  &--youtube {
    background: $color-red;
    &--hover {
      transform: translate3d(-4.55vw, -1.9vw, 0) skewX(-47deg);
      transition: transform 0.1s ease-out;
    }
  }
  &--twitter {
    background: $color-blue;
    z-index: 5;
    &--hover {
      transform: translate3d(-1.65vw, 1.9vw, 0) skewX(-47deg);
      transition: transform 0.1s ease-out;
    }
  }
  &--nowhere {
    background: $color-black;
    z-index: 5;
    &--hover {
      transform: translate3d(-6.2vw, 1.9vw, 0) skewX(-47deg);
      transition: transform 0.1s ease-out;
    }
  }
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  props: ['type'],
  data() {
    return {}
  },
  computed: {
    ...mapState('top', ['isHoverLink']),
    typeClass() {
      return 'trapezium--' + this.type
    },
    hoverClass() {
      return 'trapezium--' + this.type + '--hover'
    },
  },
  methods: {
    onHover() {
      this.$store.dispatch('top/onHoverType', this.type)
    },
    onHoverOut() {
      this.$store.dispatch('top/onHoverOutLink')
    },
  },
}
</script>
