<template>
  <div class="clock">
    <p class="clock__date">{{ date }}</p>
    <p class="clock__time">{{ time }}</p>
  </div>
</template>

<style scoped lang="scss">
.clock {
  display: flex;
  font-size: 0.4em;
  &__time {
    margin-left: 0.4em;
  }
}
</style>
<script>
export default {
  data() {
    return {
      date: '',
      time: '',
    }
  },
  computed: {
    typeClass() {
      return 'trapezium--' + this.type
    },
  },
  mounted() {
    this.getTime()
  },
  methods: {
    padding(num) {
      return ('00' + num).slice(-2)
    },
    getTime() {
      const currentTime = new Date()
      this.date =
        currentTime.getFullYear() +
        '.' +
        this.padding(currentTime.getMonth() + 1) +
        '.' +
        this.padding(currentTime.getDate())
      this.time =
        this.padding(currentTime.getHours()) +
        ':' +
        this.padding(currentTime.getMinutes()) +
        ':' +
        this.padding(currentTime.getSeconds())
      window.requestAnimationFrame(this.getTime)
    },
  },
}
</script>
