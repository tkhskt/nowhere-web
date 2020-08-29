<template>
  <div class="frame">
    <div class="frame__vertical"></div>
    <div class="frame__horizontal"></div>
  </div>
</template>

<style scoped lang="scss">
.frame {
  &__vertical {
    width: 3px;
    height: 14.8vmin;
    background: $color-gray;
  }
  &__horizontal {
    width: 14.8vmin;
    height: 3px;
    background: $color-gray;
  }
}
</style>
