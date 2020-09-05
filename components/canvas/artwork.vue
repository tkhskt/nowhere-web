<template>
  <transition name="fade">
    <section v-show="isHoverLink" ref="artwork" class="artwork">
      <canvas ref="canvas" class="artwork__canvas"></canvas>
    </section>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import Artwork from './js/artwork'

export default {
  components: {},
  props: ['images'],
  data() {
    return {
      mounted: false,
      started: false,
    }
  },
  computed: {
    ...mapState('top', ['type', 'isHoverLink', 'size']),
  },
  watch: {
    type(value) {
      this.artworkGL.changeScene(value)
    },
    images(value) {
      if (this.mounted && !this.started) {
        this.artworkGL.start(value.spotify, value.youtube)
        this.started = true
      }
    },
    size(value) {
      const artwork = this.$refs.artwork
      artwork.style.width = value.width
      artwork.style.height = value.height
    },
  },
  mounted() {
    this.artworkGL = new Artwork({
      $canvas: this.$refs.canvas,
      type: this.type,
    })
    if (
      !this.started &&
      this.images.spotify.length > 0 &&
      this.images.youtube.length > 0
    ) {
      this.artworkGL.start(this.images.spotify, this.images.youtube)
      this.started = true
    }
    this.mounted = true
  },
  destroyed() {
    // canvasを作ったり壊したりする前提の場合はここに処理停止する処理を書く（今回省略）。
  },
}
</script>

<style>
/* スタイルなどお好みで*/
.artwork {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #000000;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
  transition-delay: 0.05s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
