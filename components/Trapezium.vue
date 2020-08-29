<template>
  <div class="trapezium" :class="typeClass"></div>
</template>

<style scoped lang="scss">
.trapezium {
  width: 6.5vw;
  height: 9.5vw;
  transform: skewX(-47deg);
  &--spotify {
    background: $color-white;
  }
  &--fanbox {
    background: $color-gray;
  }
  &--youtube {
    background: $color-red;
  }
  &--twitter {
    background: $color-blue;
  }
  &--nowhere {
    background: $color-black;
  }
}
</style>
<script>
export default {
  props: ['type'],
  data() {
    return {}
  },
  computed: {
    typeClass() {
      return 'trapezium--' + this.type
    },
  },
}
</script>
