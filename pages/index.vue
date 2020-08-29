<template>
  <div class="container">
    <div class="links">
      <Trapezium :type="'spotify'" />
      <Trapezium :type="'twitter'" />
      <Trapezium :type="'fanbox'" />
      <Trapezium :type="'nowhere'" />
      <Trapezium :type="'youtube'" />
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: $color-background;
  display: flex;
  justify-content: center;
  align-items: center;
}
.links {
  display: flex;
}
</style>
