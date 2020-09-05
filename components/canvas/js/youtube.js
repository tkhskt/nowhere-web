/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import vertexShader from '../glsl/youtube.vert'
import fragmentShader from '../glsl/youtube.frag'

class YouTube {
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

    this.images = []
    this.materials = []
  }

  init($renderer, w, h) {
    this.size.windowW = w
    this.size.windowH = h

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.size.windowW / this.size.windowH,
      1,
      1000
    )
    this.camera.position.set(0, 0, 0)
    this.camera.lookAt(new THREE.Vector3(1, 0, 0))

    this.renderer = $renderer

    this.composeRender()
  }

  setImages(images) {
    this.images = images
    this.images.forEach((imageUrl, index) => {
      this.createMesh(imageUrl, index)
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

  async createMesh(imageUrl, index) {
    const distance = 100
    const angle = (360 / this.images.length) * index
    const x = distance * Math.sin((angle / 180) * Math.PI)
    const z = distance * Math.cos((angle / 180) * Math.PI)

    this.geometry = new THREE.PlaneBufferGeometry(40, 30, 30)
    const texturePromise = new Promise((resolve) => {
      const loader = new THREE.TextureLoader()
      // loader.setCrossOrigin('*')
      loader.load('http://cors-anywhere.herokuapp.com/' + imageUrl, resolve)
    })
    const texture = await texturePromise

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: {
          value: texture,
        },
        uPercent: { value: 1.0 },
      },
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    })
    this.materials.push(material)
    const mesh = new THREE.Mesh(this.geometry, material)
    mesh.rotation.y = ((angle + 180) * Math.PI) / 180
    if (index % 2 === 0) {
      mesh.position.set(x, 15.0, z)
    } else {
      mesh.position.set(x, -15.0, z)
    }

    this.scene.add(mesh)
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
    this.composer.setSize(w, h)
    this.camera.updateProjectionMatrix()
  }

  render(clockDelta, elapsedTime) {
    this.updateTimeRatio()
    this.totalTime += 0.01
    this.materials.forEach((material) => {
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uPercent = {
        value: 0,
      }
    })
    //  2 * Math.cos((this.totalTime * Math.PI) / 180)
    const x = (Math.sin(0.07 * this.totalTime * Math.PI) / 180) * this.timeRatio
    const z = (Math.cos(0.07 * this.totalTime * Math.PI) / 180) * this.timeRatio
    this.camera.lookAt(new THREE.Vector3(-x, 0, z))
    this.composer.render(clockDelta)
  }
}

export default new YouTube()
