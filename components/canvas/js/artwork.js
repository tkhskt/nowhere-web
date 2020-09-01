import * as THREE from 'three'
import YouTube from './youtube'
import Nowhere from './nowhere'
import Spotify from './spotify'
import Fanbox from './fanbox'
import Twitter from './twitter'
import Empty from './empty'

export default class Artwork {
  constructor(props) {
    this.props = props
    this.renderer = null
    this.size = {
      windowW: null,
      windowH: null,
    }
    this.type = ''
    this.clock = new THREE.Clock()
    this.init()
  }

  init() {
    this.clock.start()
    window.addEventListener('resize', this.resize.bind(this))
    this.setSize()
    this.initRenderer()
    this.initScene()
    this.loop()
  }

  setSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight,
    }
  }

  initRenderer() {
    // this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.props.$canvas,
      antialias: true,
    })
    this.renderer.setPixelRatio(1)

    // eslint-disable-next-line unicorn/number-literal-case
    this.renderer.setClearColor(0x000000)
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  initScene() {
    YouTube.init(this.renderer, this.size.windowW, this.size.windowH)
    Nowhere.init(this.renderer, this.size.windowW, this.size.windowH)
    Spotify.init(this.renderer, this.size.windowW, this.size.windowH)
    Fanbox.init(this.renderer, this.size.windowW, this.size.windowH)
    Twitter.init(this.renderer, this.size.windowW, this.size.windowH)
    Empty.init(this.renderer, this.size.windowW, this.size.windowH)
  }

  changeScene(type) {
    this.type = type
  }

  resize() {
    this.setSize()
    YouTube.resize(this.size.windowW, this.size.windowH)
    Nowhere.resize(this.size.windowW, this.size.windowH)
    Spotify.resize(this.size.windowW, this.size.windowH)
    Empty.resize(this.size.windowW, this.size.windowH)
    Fanbox.resize(this.size.windowW, this.size.windowH)
    Twitter.resize(this.size.windowW, this.size.windowH)
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  loop() {
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    const delta = this.clock.getDelta()
    switch (this.type) {
      case 'youtube':
        YouTube.render(delta)
        break
      case 'nowhere':
        Nowhere.render(delta)
        break
      case 'spotify':
        Spotify.render(delta)
        break
      case 'fanbox':
        Fanbox.render(delta)
        break
      case 'twitter':
        Twitter.render(delta)
        break
      case '':
        Empty.render()
        break
    }
  }
}
