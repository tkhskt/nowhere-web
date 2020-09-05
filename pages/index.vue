<template>
  <div ref="container" class="container">
    <Loading class="load" />
    <Logo class="logo" />
    <LinkText class="link-text" />
    <Artwork :images="images" />
    <Next v-show="isMobile" class="next" :touch="touch" />
    <div
      v-show="!isMobile"
      class="links"
      @mouseover="onHoverLink"
      @mouseleave="onHoverOutLink"
    >
      <Trapezium :type="'spotify'" />
      <Trapezium :type="'twitter'" />
      <Trapezium :type="'fanbox'" />
      <Trapezium :type="'nowhere'" />
      <Trapezium :type="'youtube'" />
    </div>
    <Frame class="frame--top" />
    <Frame class="frame--bottom" />
    <Clock />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import axios from 'axios'
import firebase from '~/plugins/firebase.js'

export default {
  data() {
    return {
      images: {
        spotify: [],
        youtube: [],
      },
      touch: false,
    }
  },
  computed: {
    ...mapState('top', ['type', 'size', 'isMobile']),
  },
  watch: {
    size(value) {
      const container = this.$refs.container
      container.style.width = value.width + 'px'
      container.style.height = value.height + 'px'
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('top/onResize', {
        width: window.innerWidth,
        height: window.innerHeight,
      })
      window.addEventListener('resize', this.onResize)
      this.$refs.container.addEventListener('touchstart', this.onTouchStart)
      this.$refs.container.addEventListener('touchend', this.onTouchEnd)
    })
    const db = firebase.firestore()
    const youtubePromise = db.collection('youtube').get()
    const spotifyPromise = db.collection('spotify').get()
    Promise.all([spotifyPromise, youtubePromise]).then((result) => {
      let spotifyImages = []
      try {
        spotifyImages = result[0].docs.map((doc) => {
          return doc.data().img
        })
      } catch {
        spotifyImages = []
      }
      let youtubeImages = []
      try {
        youtubeImages = result[1].docs.map((doc) => {
          return doc.data().img
        })
      } catch {
        youtubeImages = []
      }
      this.images = {
        spotify: spotifyImages,
        youtube: youtubeImages,
      }
      this.$store.dispatch('top/onLoaded')
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    this.$refs.container.removeEventListener('touchstart', this.onTouchStart)
    this.$refs.container.removeEventListener('touchend', this.onTouchEnd)
  },
  methods: {
    onHoverLink() {
      this.$store.dispatch('top/onHoverLink')
    },
    onHoverOutLink() {
      this.$store.dispatch('top/onHoverOutLink')
    },
    onResize() {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      this.$store.dispatch('top/onResize', size)
    },
    onTouchStart() {
      this.touch = true
    },
    onTouchEnd() {
      this.touch = false
    },
  },
}
</script>
<style scoped lang="scss">
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: $color-background;
  display: flex;
  justify-content: center;
  align-items: center;
}
.load {
  position: fixed;
  left: 100;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
}
.logo {
  position: absolute;
  top: $padding-page;
  left: $padding-page;
  z-index: 2;
}
.link-text {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 20%;
  top: 50%;
  z-index: 2;
}
.next {
  z-index: 2;
}
.links {
  display: flex;
  z-index: 2;
}
.frame {
  &--top {
    position: absolute;
    top: $padding-page;
    right: $padding-page;
    transform-origin: center;
    transform: rotate(180deg);
  }
  &--bottom {
    position: absolute;
    bottom: $padding-page;
    left: $padding-page;
    transform-origin: center;
  }
}
.clock {
  position: absolute;
  bottom: $padding-page;
  right: $padding-page;
}
</style>
