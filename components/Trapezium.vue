<template>
  <a
    class="trapezium"
    :class="[typeClass, isHoverLink ? hoverClass : '']"
    :href="getUrl"
    target="_blank"
    @mouseover="onHover"
    @mouseleave="onHoverOut"
  ></a>
</template>

<style scoped lang="scss">
.trapezium {
  display: block;
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
    getUrl() {
      switch (this.type) {
        case 'youtube':
          return 'https://www.youtube.com/channel/UCHfPYJaCDADVssISUw-49TQ'
        case 'twitter':
          return 'https://twitter.com/_NowhereEnd_'
        case 'fanbox':
          return 'https://nowhere.fanbox.cc'
        case 'nowhere':
          return 'https://kawaiimusic.jp'
        case 'spotify':
          return 'https://open.spotify.com/artist/1liqj1eLlMPbpB0mc4QFMu'
      }
      return ''
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
