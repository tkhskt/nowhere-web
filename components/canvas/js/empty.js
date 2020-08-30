/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'

class Empty {
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

  resize(w, h) {
    this.size.windowW = w
    this.size.windowH = h
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
  }

  render() {
    this.updateTimeRatio()
    this.renderer.render(this.scene, this.camera)
  }
}

export default new Empty()
