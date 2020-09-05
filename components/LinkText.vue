<template>
  <transition name="fade">
    <div v-show="(type != '' && isHoverLink) || isMobile" class="link-text">
      <p>{{ typeText }}</p>
      <div v-if="isMobile" class="underline"></div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.link-text {
  font-size: 0.57em;
  color: $color-gray;
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
