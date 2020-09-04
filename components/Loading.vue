<template>
  <transition name="fade">
    <div v-if="show" class="loading">
      <div class="text">
        <div class="text-container">
          <p class="text__initiate--dummy">INITIATING SYSTEM 2....</p>
          <div class="text__indicator--dummy"></div>
          <div class="appear">
            <p class="text__initiate">{{ text }}</p>
            <div
              class="text__indicator"
              :class="{ 'text__inidcator--loading': animationEnd }"
            ></div>
          </div>
        </div>
      </div>
      <div id="line" class="loading__line"></div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@keyframes flicker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes leave {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

.text__inidcator--loading {
  animation: flicker 1s infinite step-end forwards;
}

.leave {
  animation: leave 1s ease-out forwards;
}

.loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #000000;
}

$shadow: 0.001em;

.text {
  position: absolute;
  width: 100%;
  bottom: 50%;
  left: 0%;
  margin-bottom: 1vmin;
  display: flex;
  justify-content: center;
  &__initiate {
    left: 0;
    font-family: industry, sans-serif;
    color: #ffffff;
    text-shadow: $shadow $shadow $shadow $color-white, 0 0 0.1em $color-gray,
      0 0 0.5em $color-background;
    &--dummy {
      font-family: industry, sans-serif;
      visibility: hidden;
    }
  }
  &__indicator {
    width: 0.8em;
    height: 1em;
    background: #ffffff;
    box-shadow: $shadow $shadow $shadow $color-white, 0 0 0.1em $color-gray,
      0 0 0.005em $color-background;
    &--dummy {
      width: 0.8em;
      height: 1em;
      visibility: hidden;
    }
  }
}

.text-container {
  position: relative;
  display: flex;
}

.appear {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
}

.loading__line {
  position: absolute;
  top: 50%;
  right: 0%;
  width: 100%;
  height: 0.5vmin;
  background: #ffffff;
  box-shadow: $shadow $shadow $shadow $color-white, 0 0 0.1em $color-gray,
    0 0 0.002em $color-background;
}

.link-text {
  font-family: industry, sans-serif;
  font-size: 0.57em;
  color: $color-gray;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<script>
import { mapState } from 'vuex'
import { TweenLite, Expo } from 'gsap/dist/gsap'

export default {
  data() {
    return {
      text: '',
      animationEnd: false,
      show: true,
    }
  },
  computed: {
    ...mapState('top', ['loaded']),
  },
  watch: {
    loaded(value) {
      if (value && this.animationEnd) {
        // this.animateLine()
        this.delete()
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initiatingSystem2()
    })
  },
  methods: {
    initiatingSystem2() {
      const text = 'INITIATING SYSTEM 2....'
      const count = {
        val: -1,
      }
      let previousValue = -1
      TweenLite.to(count, 4, {
        val: text.length - 1,
        roundProps: 'val',
        onUpdate: () => {
          if (count.val > previousValue + 1) {
            this.text = this.text + text[previousValue + 1]
            previousValue = previousValue + 1
            return
          }
          if (previousValue !== count.val) {
            this.text = this.text + text[count.val]
          }
          previousValue = count.val
        },
        onComplete: () => {
          // this.animationEnd = true
          if (this.loaded) {
            // this.animateLine()
            this.delete()
          }
        },
      }).delay(0.3)
    },
    delete() {
      const text = 'INITIATING SYSTEM 2....'
      const count = {
        val: text.length - 1,
      }
      let previousValue = text.length
      TweenLite.to(count, 0.5, {
        val: 0,
        roundProps: 'val',
        ease: Expo.easeOut,
        onUpdate: () => {
          if (previousValue !== count.val) {
            this.text = text.slice(0, count.val)
          }
          previousValue = count.val
        },
        onComplete: () => {
          // this.animationEnd = true
          this.system2Loaded()
        },
      })
    },
    system2Loaded() {
      const text = 'SYSTEM 2 LOADED...'
      const count = {
        val: -1,
      }
      let previousValue = -1
      TweenLite.to(count, 0.5, {
        val: text.length - 1,
        roundProps: 'val',
        onUpdate: () => {
          if (count.val > previousValue + 1) {
            this.text = this.text + text[previousValue + 1]
            previousValue = previousValue + 1
            return
          }
          if (previousValue !== count.val) {
            this.text = this.text + text[count.val]
          }
          previousValue = count.val
        },
        onComplete: () => {
          this.animationEnd = true
          // this.animateLine()
          this.animateLine()
        },
      })
    },
    animateLine() {
      const line = document.getElementById('line')
      TweenLite.to(line, 0.7, {
        width: 0,
        ease: Expo.easeIn,
        onComplete: () => {
          this.show = false
          const html = document.getElementsByTagName('html')[0]
          html.style.backgroundColor = '#DDDDDD'
        },
      })
    },
  },
}
</script>
