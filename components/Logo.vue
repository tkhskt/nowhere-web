<template>
  <div class="logo">
    <p class="logo__title">Nowhere</p>
    <p class="logo__subtitle"><span>un</span>official website</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  user-select: none;
  &__title {
    line-height: 0.9;
    @media screen and (max-width: $breakpoint) {
      font-size: 12.5vmin;
      color: $color-gray;
    }
  }
  &__subtitle {
    font-size: 0.4em;
    margin-top: 0.2em;
    span {
      color: #e36c6c;
    }
    @media screen and (max-width: $breakpoint) {
      font-size: 5vmin;
      color: $color-gray;
    }
  }
}
</style>
