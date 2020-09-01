/* eslint-disable no-undef */
self.importScripts(
  '../three/three.min.js',
  '../three/DRACOLoader.js',
  '../three/GLTFLoader.js'
)

self.addEventListener('message', (message) => {
  const loader = new THREE.GLTFLoader()
  const dracoLoader = new THREE.DRACOLoader()
  dracoLoader.setDecoderConfig({ type: 'js' })
  dracoLoader.setDecoderPath('../gltf/')
  loader.setDRACOLoader(dracoLoader)
  loader.load(require('@/assets/obj/donut3.glb'), (result) => {
    const obj = result.scene
    self.postMessage(JSON.parse(obj.toJson()))
  })
})
