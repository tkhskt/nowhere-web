/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import Power2, { TimelineMax } from 'gsap'
import vertexShader from '../glsl/spotify.vert'
import fragmentShader from '../glsl/spotify.frag'

class Nowhere {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null

    this.size = {
      windowW: null,
      windowH: null,
    }

    this.clock = new THREE.Clock()

    this.frame = 0
    this.time = 0
    this.timeRatio = 0

    this.totalTime = 0

    this.images = [
      'https://i.scdn.co/image/ab67616d0000b2739c75d5625628a9dcdb448663',
      'https://i.scdn.co/image/ab67616d0000b273b2cb6dea04617bc7e2c53593',
      'https://i.scdn.co/image/ab67616d0000b2739660975340cd5cdb05dc5a23',
      'https://i.scdn.co/image/ab67616d0000b2735e96dfafc7062b940cea81af',
      'https://i.scdn.co/image/ab67616d0000b27372dc4f2c1c65e84685a72b54',
    ]

    /* glsl setting */

    this.vertex = vertexShader
    this.fragment = fragmentShader
    this.textures = []

    this.uniforms = {
      intensity: { value: 0.3, type: 'f', min: 0, max: 2 },
    }
    this.duration = 1
    this.debug = false
    this.easing = 'easeInOut'
    this.paused = true
    this.isRunning = false
    this.lastUpdate = null
    this.current = 0
  }

  init($renderer, w, h) {
    this.size.windowW = w
    this.size.windowH = h

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    )
    this.camera.position.set(0, 0, 2)

    this.renderer = $renderer

    this.images.forEach((image, index) => {
      this.createMesh(image, index)
    })
    // this.createMesh(0)
    this.composeRender()

    this.loadImages(() => {
      this.createMesh()
      this.resize(w, h)
      this.settings()
      this.paused = false
      this.lastUpdate = new Date().getTime()
    })
  }

  loadImages(cb) {
    const promises = []
    const that = this
    this.images.forEach((url, i) => {
      const promise = new Promise((resolve) => {
        that.textures[i] = new THREE.TextureLoader().load(url, resolve)
      })
      promises.push(promise)
    })

    Promise.all(promises).then(() => {
      cb()
    })
  }

  settings() {
    this.settings = { progress: 0.5 }
    // if(this.debug) this.gui.add(this.settings, "progress", 0, 1, 0.01);

    Object.keys(this.uniforms).forEach((item) => {
      this.settings[item] = this.uniforms[item].value
    })
  }

  updateTimeRatio() {
    const lastTime = this.times
    if (lastTime > 0) {
      // 1フレーム当たりの時間(ミリ秒)
      const FPS_60_SEC = 1000 / 60
      // 差分時間をセット
      const dTime = new Date().getTime() - lastTime
      // FPS60との比較係数をセット
      this.timeRatio = dTime / FPS_60_SEC
    }
    // 現在時間をセット
    this.times = new Date().getTime()
  }

  createMesh() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 },
        progress: { type: 'f', value: 0 },
        border: { type: 'f', value: 0 },
        intensity: { type: 'f', value: 0 },
        scaleX: { type: 'f', value: 40 },
        scaleY: { type: 'f', value: 40 },
        transition: { type: 'f', value: 40 },
        swipe: { type: 'f', value: 0 },
        width: { type: 'f', value: 0 },
        radius: { type: 'f', value: 0 },
        texture1: { type: 'f', value: this.textures[0] },
        texture2: { type: 'f', value: this.textures[1] },
        displacement: {
          type: 'f',
          value: new THREE.TextureLoader().load(
            require('@/assets/img/disp1.jpg')
          ),
        },
        resolution: { type: 'v4', value: new THREE.Vector4() },
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
    })

    this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2)

    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  composeRender() {
    this.composer = new EffectComposer(this.renderer)
    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)
    this.customPass = new FilmPass()
    this.customPass.renderToScreen = true
    this.composer.addPass(this.customPass)
  }

  resize(w, h) {
    this.width = w
    this.height = h
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    // image cover
    this.imageAspect =
      this.textures[0].image.height / this.textures[0].image.width
    let a1
    let a2
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect
      a2 = 1
    } else {
      a1 = 1
      a2 = this.height / this.width / this.imageAspect
    }

    this.material.uniforms.resolution.value.x = this.width
    this.material.uniforms.resolution.value.y = this.height
    this.material.uniforms.resolution.value.z = a1
    this.material.uniforms.resolution.value.w = a2

    const dist = this.camera.position.z
    const height = 1
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist))

    this.plane.scale.x = this.camera.aspect
    this.plane.scale.y = 1
    this.camera.updateProjectionMatrix()
  }

  next() {
    if (this.isRunning) return
    this.isRunning = true
    const len = this.textures.length
    const nextTexture = this.textures[(this.current + 1) % len]
    this.material.uniforms.texture2.value = nextTexture
    const tl = new TimelineMax()
    tl.to(this.material.uniforms.progress, this.duration, {
      value: 1,
      ease: Power2[this.easing],
      onComplete: () => {
        this.current = (this.current + 1) % len
        this.material.uniforms.texture1.value = nextTexture
        this.material.uniforms.progress.value = 0
        this.isRunning = false
        this.lastUpdate = new Date().getTime()
      },
    })
  }

  render(clockDelta) {
    const delta = new Date().getTime() - this.lastUpdate
    if (delta >= 2000) {
      this.next()
    }
    this.updateTimeRatio()
    if (this.paused) return
    // this.composer.render()
    Object.keys(this.uniforms).forEach((item) => {
      this.material.uniforms[item].value = this.settings[item]
    })
    this.composer.render(clockDelta)
  }
}

export default new Nowhere()
