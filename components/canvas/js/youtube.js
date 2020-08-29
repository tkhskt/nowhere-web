/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'

class YouTube {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null

    this.size = {
      windowW: null,
      windowH: null,
    }

    this.clock = null

    this.frame = 0
    this.time = 0
    this.timeRatio = 0

    this.totalTime = 0

    this.images = [
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
      'https://i.scdn.co/image/ab67616d0000b27322afe15cdab70494b8424177',
    ]
  }

  init($canvas) {
    this.setSize()

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      1,
      1000
    )
    this.camera.position.set(0, 0, 0)
    this.camera.lookAt(new THREE.Vector3(0, 0, -1))

    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
      antialias: true,
    })

    // this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setPixelRatio(1)

    // eslint-disable-next-line unicorn/number-literal-case
    this.renderer.setClearColor(0x000000)
    this.renderer.setSize(this.size.windowW, this.size.windowH)

    this.clock = new THREE.Clock()
    this.clock.start()
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

  createMesh(imageUrl, index) {
    // const distance = 100
    // const angle = (360 / this.images.length) * index

    this.geometry = new THREE.PlaneBufferGeometry(30, 30, 30)
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(this.geometry, material)
    mesh.position.set(0.0, 0.0, -100.0)
    this.scene.add(mesh)
    new THREE.TextureLoader().load(imageUrl, (tex) => {
      material.map = tex
      material.needsUpdate = true
    })
  }

  setSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight,
    }
  }

  resize() {
    this.setSize()
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  render() {
    this.updateTimeRatio()
    this.totalTime += 0.05
    const x = (Math.sin(0.07 * this.totalTime * Math.PI) / 180) * this.timeRatio
    const z = (Math.cos(0.07 * this.totalTime * Math.PI) / 180) * this.timeRatio
    this.camera.lookAt(new THREE.Vector3(-x, 0, -z))

    this.renderer.render(this.scene, this.camera)
  }
}

export default new YouTube()
