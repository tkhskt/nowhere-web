<template>
  <div class="next" :class="{ 'next--pressed': touch }">
    <template v-for="n in 4">
      <div :key="n" class="arrow" :class="{ 'arrow--pressed': touch }">
        <span class="arrow__top"></span>
        <span class="arrow__bottom"></span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.next {
  display: flex;
  transition: padding 0.1s ease-out;
  padding-right: 3vmin;
  &--pressed {
    padding-left: 10vmin;
    transition: padding 0.1s ease-in;
  }
}
.arrow {
  display: inline-block;
  width: 7.2vmin;
  height: 7.2vmin;
  margin: 0 -0.6vmin;
  border-top: 2px solid $color-white;
  border-right: 2px solid $color-white;
  transform: rotate(45deg);
  transition: margin 0.1s ease-out;
  &--pressed {
    margin: 0 -1.5vmin;
    transition: margin 0.1s ease-in;
  }
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  props: ['touch', 'swiped'],
  data() {
    return {
      types: ['youtube', 'nowhere', 'fanbox', 'twitter', 'spotify'],
      currentTypeIndex: 0,
    }
  },
  computed: {
    ...mapState('top', ['isMobile']),
  },
  watch: {
    swiped(value) {
      if (!this.isMobile) return
      if (value) {
        this.currentTypeIndex = (this.currentTypeIndex + 1) % this.types.length
        this.$store.dispatch(
          'top/onHoverType',
          this.types[this.currentTypeIndex]
        )
      }
    },
  },
  mounted() {
    if (window.innerHeight >= 1024) return
    this.$store.dispatch('top/onHoverType', this.types[this.currentTypeIndex])
  },
}
</script>
