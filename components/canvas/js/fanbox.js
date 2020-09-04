/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import Worker from '~/components/canvas/js/donut.worker'

class Fanbox {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null

    this.size = {
      windowW: null,
      windowH: null,
    }

    this.frame = 0
    this.time = 0
    this.timeRatio = 0

    this.totalTime = 0
    this.loaded = false
  }

  init($renderer, w, h) {
    this.size.windowW = w
    this.size.windowH = h

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      800,
      this.size.windowW / this.size.windowH,
      1,
      1000
    )
    const light = new THREE.DirectionalLight(0xffffff, 1)
    this.scene.add(light)
    this.camera.position.set(60, 60, 60)
    this.camera.lookAt(this.scene.position)

    this.renderer = $renderer
    this.createMesh()
    // const worker = new Worker()
    // worker.postMessage('load')
  }

  async createMesh() {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.setDecoderPath('gltf/')
    loader.setDRACOLoader(dracoLoader)
    const objPromise = new Promise((resolve) => {
      loader.load(require('@/assets/obj/donut3.glb'), resolve)
    })
    const f = await objPromise
    const obj = f.scene

    obj.scale.set(30, 30, 30)
    obj.position.set(0, -20, 0) // 位置の初期化
    this.scene.add(obj)
    this.loaded = true
    this.composeRender()
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

  composeRender() {
    this.composer = new EffectComposer(this.renderer)
    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)
    this.customPass = new FilmPass(0.7, 0, 0, 0)
    this.customPass.renderToScreen = true
    this.composer.addPass(this.customPass)
  }

  resize(w, h) {
    this.size.windowW = w
    this.size.windowH = h
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
  }

  render(clockDelta) {
    if (!this.loaded) return
    this.updateTimeRatio()
    this.totalTime += 0.01
    const x = 60 * Math.sin((this.totalTime * 10 * Math.PI) / 180)
    const z = 60 * Math.cos((this.totalTime * 10 * Math.PI) / 180)
    this.camera.position.set(x, 60, z)
    this.camera.lookAt(this.scene.position)
    this.composer.render(clockDelta)
  }
}

export default new Fanbox()
