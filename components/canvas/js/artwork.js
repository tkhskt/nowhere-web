import YouTube from './youtube'

export default class Artwork {
  constructor(props) {
    this.props = props
    this.init()
  }

  init() {
    YouTube.init(this.props.$canvas)
    window.addEventListener('resize', this.resize.bind(this))
    this.loop()
  }

  resize() {
    YouTube.resize()
  }

  loop() {
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    YouTube.render()
  }
}
