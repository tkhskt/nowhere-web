/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { MeshLine, MeshLineMaterial } from 'three.meshline'

class Twitter {
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

    // line settings
    this.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight)
    this.curve = null
    this.meshLine = null
    this.line = null
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
    this.camera.position.set(0, 0, 0)
    this.camera.lookAt(this.scene.position)

    this.renderer = $renderer
    this.createMesh()
  }

  createMesh() {
    const points = []
    for (let j = 0; j < 200 * 5; j += 3) {
      points.push(new THREE.Vector3(-70 + 0.3 * j, 5 * Math.sin(0.01 * j), -25))
    }
    this.curve = new THREE.CatmullRomCurve3(points)
    this.line = new THREE.Geometry().setFromPoints(this.curve.getPoints(50))
    const meshLine = new MeshLine()
    meshLine.setGeometry(this.line)

    const material = new MeshLineMaterial({
      useMap: false,
      color: new THREE.Color(0x1da1f2),
      opacity: 1,
      resolution: this.resolution,
      sizeAttenuation: false,
      lineWidth: 10,
      near: this.camera.near,
      far: this.camera.far,
    })
    this.mesh = new THREE.Mesh(meshLine.geometry, material)
    this.scene.add(this.mesh)
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
    const bloomPass = new UnrealBloomPass()
    bloomPass.renderToScreen = true
    this.composer.addPass(bloomPass)
    const filmPass = new FilmPass(0.7, 0, 0, 0)
    filmPass.renderToScreen = true
    this.composer.addPass(filmPass)
  }

  resize(w, h) {
    this.size.windowW = w
    this.size.windowH = h
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.resolution.set(w, h)
    this.composer.setSize(w, h)
    this.camera.updateProjectionMatrix()
  }

  render(clockDelta) {
    this.updateTimeRatio()
    this.totalTime += 0.4

    for (let i = 0; i < this.curve.points.length; i++) {
      this.curve.points[i].y =
        Math.sin((i * 3 + this.totalTime * Math.PI) / 180) * 5
    }

    this.line = new THREE.Geometry().setFromPoints(this.curve.getPoints(50))
    const mesh = new MeshLine()
    mesh.setGeometry(this.line)

    this.mesh.geometry.dispose()
    this.mesh.geometry = mesh.geometry
    this.composer.render(clockDelta)
  }
}

export default new Twitter()
