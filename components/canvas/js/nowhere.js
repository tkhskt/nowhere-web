/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
// import baseFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

class Nowhere {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null
    // this.font = new THREE.Font(baseFont)

    this.size = {
      windowW: null,
      windowH: null,
    }

    this.frame = 0
    this.time = 0
    this.timeRatio = 0

    this.totalTime = 0

    this.scripts = [
      'A world where counting the years is meaningless…',
      'One day, the alter opens up and the girl wake up',
    ]
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

    this.font = new THREE.Font(
      require('@/assets/font/helvetiker_regular.typeface.json')
    )
    this.scripts.forEach((script, index) => {
      this.createMesh(script, index)
    })
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

  createMesh(script, index) {
    const distance = 100

    const font = this.font
    this.geometry = new THREE.TextGeometry(script, {
      font,
      size: 2,
      height: 0.1,
      curveSegments: 20,
    })
    this.geometry.computeBoundingBox()
    this.geometry.center()

    const textMaterial = new THREE.MeshBasicMaterial({
      color: 0xa0a0a0,
    })

    const mesh = new THREE.Mesh(this.geometry, textMaterial)
    mesh.rotation.y = ((90 + 180) * Math.PI) / 180
    if (index % 2 === 0) {
      mesh.position.set(distance, 20.0, 0)
    } else {
      mesh.position.set(distance, -20.0, 0)
    }

    this.scene.add(mesh)
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
    this.size.windowW = w
    this.size.windowH = h
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
  }

  render() {
    this.updateTimeRatio()
    this.composer.render()
  }
}

export default new Nowhere()
