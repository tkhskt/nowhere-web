<template>
  <div class="container">
    <Loading class="load" />
    <Logo class="logo" />
    <LinkText class="link-text" />
    <Artwork :images="images" />
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
import { mapState } from 'vuex'
// import axios from 'axios'
import firebase from '~/plugins/firebase.js'

export default {
  data() {
    return {
      images: {
        spotify: [],
        youtube: [],
      },
    }
  },
  computed: {
    ...mapState('top', ['type']),
  },
  mounted() {
    const db = firebase.firestore()
    // const spotifyPromise = axios.get(
    //   'https://us-central1-nowhere-web.cloudfunctions.net/spotify'
    // )
    const youtubePromise = db.collection('youtube').get()
    const spotifyPromise = db.collection('spotify').get()
    Promise.all([spotifyPromise, youtubePromise]).then((result) => {
      // const tracks = []
      // result[0].data.items.forEach((item) => {
      //   const exist = tracks.some((track) => {
      //     return track.name === item.name
      //   })
      //   if (!exist) {
      //     tracks.push({
      //       name: item.name,
      //       img: item.images[0].url,
      //     })
      //   }
      // })
      // const spotifyImages = tracks.map((item) => {
      //   return item.img
      // })
      let spotifyImages = []
      try {
        spotifyImages = result[0].docs.map((doc) => {
          return doc.data().img
        })
      } catch {
        spotifyImages = []
      }
      let youtubeImages = []
      try {
        youtubeImages = result[1].docs.map((doc) => {
          return doc.data().img
        })
      } catch {
        youtubeImages = []
      }
      this.images = {
        spotify: spotifyImages,
        youtube: youtubeImages,
      }
      this.$store.dispatch('top/onLoaded')
    })
  },
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
.load {
  position: fixed;
  left: 100;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
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
