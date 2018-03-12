<template>
  <div>
  </div>
</template>

<script>
import { random } from 'lodash'
class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static fromPolar(r, t) {
    return new Vector(r * Math.cos(t), r * Math.sin(t))
  }
  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }
  mul(x) {
    this.x *= x
    this.y *= x
    return this
  }
  dist(v) {
    let dx, dy
    return Math.sqrt((dx = this.x - v.x) * dx, (dy = this.y - v.y) * dy)
  }
  get mag() {
    return Math.sqrt(this.x * this.x, this.y * this.y)
  }
  set mag(v) {
    let n = this.norm()
    this.x = n.x * v
    this.y = n.y * v
  }
  norm() {
    let mag = this.mag
    return new Vector(this.x / mag, this.y / mag)
  }
}
class Noise {
  constructor(w, h, oct) {
    this.width = w
    this.height = h
    this.octaves = oct
    this.canvas = Noise.compositeNoise(w, h, oct)
    let ctx = this.canvas.getContext('2d')
    this.data = ctx.getImageData(0, 0, w, h).data
  }
  // create w by h noise
  static noise(w, h) {
    let cv = document.createElement('canvas'),
      ctx = cv.getContext('2d')
    cv.width = w
    cv.height = h
    let img = ctx.getImageData(0, 0, w, h),
      data = img.data
    for (let i = 0, l = data.length; i < l; i += 4) {
      data[i + 0] = random(0, 255)
      data[i + 1] = random(0, 255)
      data[i + 2] = random(0, 255)
      data[i + 3] = 255
    }
    ctx.putImageData(img, 0, 0)
    return cv
  }
  // create composite noise with multiple octaves
  static compositeNoise(w, h, oct) {
    let cv = document.createElement('canvas'),
      ctx = cv.getContext('2d')
    cv.width = w
    cv.height = h
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    ctx.globalAlpha = 1 / oct
    for (let i = 0; i < oct; i++) {
      let noise = Noise.noise(w >> i, h >> i)
      ctx.drawImage(noise, 0, 0, w, h)
    }
    return cv
  }
  // returns noise from -1.0 to 1.0
  getNoise(x, y, ch) {
    // bitwise ~~ to floor
    let i = (~~x + ~~y * this.width) * 4
    return this.data[i + ch] / 127 - 1
  }
}
class Particle {
  constructor(x, y, vx = 0, vy = 0) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(vx, vy)
    this.acc = new Vector(0, 0)
    // this.tick = 0
    // this.life = random(100, 300)
  }
  update(noise) {
    // this.tick++
    // if (this.tick > this.life)
    //   return
    this.pos.add(this.vel)
    let { x, y } = this.pos
    let dx = noise.getNoise(x, y, 0),
      dy = noise.getNoise(x, y, 1)
    // this.vel.add(this.acc)
    this.vel.add(new Vector(dx, dy))
    // this.acc.add(new Vector(dx / 10, dy / 10))
    // this.acc.mul(0.95)
    this.vel.mul(0.95)
  }
  draw(ctx) {
    // if (this.tick > this.life) return
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
  }
}
// https://codepen.io/ajm13/pen/qraGKY
function initCanvas(targetCanvas) {
  let devicePixelRatio, scaleCanvas, w, h, noise, particles, rid
  let cv = targetCanvas
  let ctx = cv.getContext('2d')
  function resize() {
    devicePixelRatio = window.devicePixelRatio || 1
    scaleCanvas = 1//devicePixelRatio > 1 ? devicePixelRatio : 1
    w = ~~(innerWidth * devicePixelRatio * scaleCanvas)
    h = ~~(innerHeight * devicePixelRatio * scaleCanvas)
    cv.width = w
    cv.height = h
  }
  function init() {
    resize()
    noise = new Noise(w, h, 8)
    // document.body.appendChild(noise.canvas)
    particles = []
    for (let i = 0; i < 10000; i++) {
      let r1 = w / 4, //random(w / 4 - 100, w / 4, true),
        a1 = random(0, 2 * Math.PI, true),
        r2 = random(0, 1, true),
        a2 = random(0, 2 * Math.PI, true)
      let pos = Vector.fromPolar(r1, a1)
      let vel = Vector.fromPolar(r2, a2)
      pos.add(new Vector(w / 2, h / 2))
      particles.push(new Particle(pos.x, pos.y, vel.x, vel.y))
    }
    ctx.fillStyle = '#FFF'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    animate()
  }
  // click once to pause, twice to regen
  function generate() {
    if (rid) {
      window.cancelAnimationFrame(rid)
      rid = 0
    } else {
      init()
    }
  }
  function render() {
    for (let p of particles) {
      p.update(noise)
      p.draw(ctx)
    }
  }
  function animate() {
    // for (let i = 0; i < 10; i++)
    render()
    rid = window.requestAnimationFrame(animate)
  }
  cv.addEventListener('mousedown', generate)
  cv.addEventListener('touchstart', generate)
  window.addEventListener('resize', generate)
  init()
  return {
    destroyCanvas() {
      cv.removeEventListener('mousedown', generate)
      cv.removeEventListener('touchstart', generate)
      window.removeEventListener('resize', generate)
    }
  }
}
export default {
  data() {
    return {}
  },
  mounted() {
    if (this.canvasOpts) return
    const targetCanvas = document.createElement('canvas')
    targetCanvas.className = 'index-canvas'
    this.canvasOpts = initCanvas(targetCanvas)
    this.$el.appendChild(targetCanvas)
  },
  beforeDestroy() {
    this.canvasOpts.destroyCanvas()
    this.canvasOpts = null
  }
}
</script>

<style>
.index-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}
</style>

