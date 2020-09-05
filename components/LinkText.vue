<template>
  <transition name="fade">
    <a
      v-show="(type != '' && isHoverLink) || isMobile"
      class="link-text"
      :href="getUrl"
      target="_blank"
    >
      <p>{{ typeText }}</p>
      <div v-if="isMobile" class="underline"></div>
    </a>
  </transition>
</template>

<style scoped lang="scss">
.link-text {
  display: block;
  font-size: 0.57em;
  color: $color-gray;
  text-decoration: none;
  @media screen and (max-width: $breakpoint) {
    font-size: 7vmin;
    color: $color-white;
  }
}
.underline {
  width: 100%;
  height: 2px;
  margin-top: 1vmin;
  background: $color-white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('top', ['type', 'isMobile', 'isHoverLink']),
    typeText() {
      switch (this.type) {
        case 'spotify':
          return 'Spotify'
        case 'twitter':
          return 'Twitter'
        case 'fanbox':
          return 'Fanbox'
        case 'nowhere':
          return 'Nowhere'
        case 'youtube':
          return 'YouTube'
      }
      return ''
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
