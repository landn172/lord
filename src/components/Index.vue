<template>
  <div>
    <canvas id="canvas-bg" class="index-canvas"></canvas>
    <div class="wrapper">
      <h1>Lord.space</h1>
      <p>
        <a class="link" href="/blog/">blog</a>
      </p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA',
    };
  },
  mounted() {
    document.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })

    const c = document.getElementById('canvas-bg')

    let  x = c.getContext('2d'),
      pr = window.devicePixelRatio || 1,
      w = window.innerWidth,
      h = window.innerHeight,
      f = 90,
      q,
      m = Math,
      r = 0,
      u = m.PI * 2,
      v = m.cos,
      z = m.random
    c.width = w * pr
    c.height = h * pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i() {
      x.clearRect(0, 0, w, h)
      q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }]
      while (q[1].x < w + f) d(q[0], q[1])
    }
    function d(i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      let k = j.x + (z() * 2 - 0.25) * f,
        n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      r -= u / -50
      x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      x.fill()
      q[0] = q[1]
      q[1] = { x: k, y: n }
    }
    function y(p) {
      const t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

.index-canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    z-index: 10;
}

.link {
    color: #000;
}
</style>
