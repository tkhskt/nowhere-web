<template>
  <div ref="info" class="info" @mouseleave="shrink">
    <p ref="title" class="info__header-text">Nowhere Monitoring System 2.0</p>
    <p class="info__credit">
      Designed&amp;Developed by thorn(<a
        class="credit__link"
        href="https://twitter.com/gericass"
        target="_blank"
        >@gericass</a
      >)
    </p>
    <div class="info__fonts">
      <p class="fonts__title">Fonts:</p>
      <div class="fonts__contents">
        <div class="fonts__cantiga">Cantiga by Isac Rodrigues</div>
        <div class="fonts__industry">Industry by Mattox Shuler</div>
      </div>
    </div>
    <!-- <div ref="arrow" class="arrow" @click="onClick"></div> -->
    <!-- <div class="up-arrow"></div> -->
  </div>
</template>

<style scoped lang="scss">
.info {
  background: $color-black;
  color: $color-white;
  padding: 2vmin;
  padding-bottom: 10vmin;
  overflow: hidden;
  width: 18vw;
  min-width: 400px;
  &__header-text {
    text-align: center;
    font-size: 0.4em;
    line-height: 0.7;
    user-select: none;
    &:after {
      display: inline-block;
      content: '';
      background: $color-white;
      width: 100%;
      height: 1px;
    }
  }
  &__credit {
    margin-top: 2vmin;
    font-size: 0.25em;
  }
  &__fonts {
    display: flex;
    margin-top: 2vmin;
    font-size: 0.25em;
    margin-top: 1.5vmin;
  }
}
.fonts {
  &__title {
    margin-right: 0.5em;
  }
  &__industry {
    margin-top: 0.25em;
  }
}
.credit__link {
  &:link {
    color: $color-white;
  }
  &:visited {
    color: $color-white;
  }
  &:hover {
    color: $color-white;
  }
  &:active {
    color: $color-white;
  }
}

.arrow {
  position: absolute;
  display: block;
  cursor: pointer;
  width: unquote('max(2vmin, 24px)');
  height: unquote('max(2vmin, 24px)');
  border-top: 1px solid $color-white;
  border-right: 1px solid $color-white;
  transform-origin: center;
  transform: rotate(135deg);
  bottom: 1vmin;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
<script>
import { mapState } from 'vuex'
import { Linear, TimelineMax, TweenLite, TweenMax } from 'gsap/dist/gsap'
// import { TweenLite } from 'gsap/gsap-core'

export default {
  data() {
    return {
      animationRunning: false,
      expanded: false,
      opened: false,
    }
  },
  computed: {
    ...mapState('top', ['hoverClock']),
  },
  watch: {
    hoverClock(value) {
      if (value) {
        this.expand()
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.duration = 0.2
      this.shrinkDuration = 0.3
      TweenLite.set(this.$refs.info, {
        width: Math.max(window.innerWidth * 0.18, 450),
      })
      this.close()
    })
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    onClick() {
      if (this.opened) {
        this.close()
      }
    },
    resize() {
      const vMin = Math.min(window.innerHeight, window.innerWidth)
      TweenLite.set(this.$refs.info, {
        height: 'auto',
        paddingBottom: 0.1 * vMin,
        paddingTop: 0.02 * vMin,
        paddingLeft: 0.02 * vMin,
        paddingRight: 0.02 * vMin,
        width: Math.max(window.innerWidth * 0.18, 450),
        opacity: 0,
      })
      TweenLite.set(this.$refs.title, {
        opacity: 1,
      })
      this.animationRunning = false
      this.timeline.kill()
      this.close()
    },
    close() {
      if (this.animationRunning) return
      const vMin = Math.min(window.innerHeight, window.innerWidth)
      const timeline = new TimelineMax({
        onStart: () => {
          this.animationRunning = true
          TweenLite.set(this.$refs.info, {
            minWidth: 0,
          })
        },
        onComplete: () => {
          this.animationRunning = false
          this.expanded = false
          this.opened = false
        },
      })
      this.closeInfo = TweenLite.to(this.$refs.info, this.duration, {
        height: Math.max(vMin * 0.03, 36),
        paddingBottom: 0,
        paddingTop: 0,
        ease: Linear,
      })
      this.fadeTitle = TweenLite.to(this.$refs.title, this.duration, {
        opacity: 0,
        ease: Linear,
      })
      this.shrinkInfo = TweenMax.to(this.$refs.info, this.shrinkDuration, {
        width: 0,
        ease: Linear,
      })
      this.removeInfoPadding = TweenMax.to(
        this.$refs.info,
        this.shrinkDuration,
        {
          padding: 0,
          ease: Linear,
        }
      )
      this.timeline = timeline
      timeline
        .add(this.closeInfo)
        .add(this.fadeTitle, '-=' + this.duration)
        .add(this.shrinkInfo)
        .add(this.removeInfoPadding, '-=' + this.duration)
    },
    expand() {
      if (this.animationRunning) return
      const timeline = new TimelineMax({
        onStart: () => {
          this.animationRunning = true
          this.$refs.info.style.opacity = 1
        },
        onComplete: () => {
          this.animationRunning = false
          this.expanded = true
          this.open()
        },
      })
      timeline
        .add(this.shrinkInfo.reverse())
        .add(this.removeInfoPadding.reverse(), '-=' + this.shrinkDuration)
    },
    open() {
      if (this.animationRunning) return
      const timeline = new TimelineMax({
        onStart: () => {
          this.animationRunning = true
        },
        onComplete: () => {
          this.animationRunning = false
          this.expanded = true
          this.opened = true
        },
      })
      timeline
        .add(this.closeInfo.reverse())
        .add(this.fadeTitle.reverse(), '-=' + this.duration)
    },
    shrink() {
      if (this.opened) {
        this.close()
        return
      }
      if (this.animationRunning) return
      const timeline = new TimelineMax({
        onStart: () => {
          this.animationRunning = true
        },
        onComplete: () => {
          this.animationRunning = false
          this.expanded = false
        },
      })
      timeline
        .add(this.shrinkInfo.restart())
        .add(this.removeInfoPadding.restart(), '-=' + this.shrinkDuration)
    },
  },
}
</script>
