<template>
  <transition name="fade">
    <section class="artwork" v-show="isHoverLink">
      <canvas ref="canvas" class="artwork__canvas"></canvas>
    </section>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import Artwork from './js/artwork'

export default {
  components: {},
  props: [],
  data() {
    // 基本的にはここにthree.jsのオブジェクトを追加しない。
    return {}
  },
  computed: {
    ...mapState('top', ['type', 'isHoverLink']),
  },
  watch: {
    type(value) {
      this.artworkGL.changeScene(value)
    },
  },
  mounted() {
    // canvas要素を渡す。
    this.artworkGL = new Artwork({
      $canvas: this.$refs.canvas,
      type: this.type,
    })
  },
  destroyed() {
    // canvasを作ったり壊したりする前提の場合はここに処理停止する処理を書く（今回省略）。
  },
  methods: {
    // この中にthree.jsの処理をばりばり書かない。
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
