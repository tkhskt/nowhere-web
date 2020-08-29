<template>
  <transition name="fade">
    <div v-if="type != ''" class="link-text">
      <p>{{ typeText }}</p>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.link-text {
  font-size: 0.57em;
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
    ...mapState('top', ['type']),
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
