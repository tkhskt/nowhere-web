<template>
  <div class="container">
    <Logo class="logo" />
    <LinkText class="link-text" />
    <Artwork />
    <div class="links" @mouseover="onHoverLink" @mouseleave="onHoverOutLink">
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
export default {
  methods: {
    onHoverLink() {
      this.$store.dispatch('top/onHoverLink')
    },
    onHoverOutLink() {
      this.$store.dispatch('top/onHoverOutLink')
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
.links {
  display: flex;
  z-index: 2;
  display: none;
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
