<template>
  <div>
    <Loading class="load" />
    <Nuxt />
  </div>
</template>

<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.load {
  position: fixed;
  left: 100;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
}
</style>
