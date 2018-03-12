<template>
  <main id="app">
    <router-view></router-view>
    <!-- <canvas-bg></canvas-bg> -->
    <canvas-bg-pn></canvas-bg-pn>
  </main>
</template>

<script>
  // import CanvasBg from './components/canvas-bg.vue'
  import CanvasBgPn from './components/canvas-bg-pn.vue'
  export default {
    name: 'app',
    components:{
      // CanvasBg,
      CanvasBgPn
    }
  };
</script>

<style>
  html {
    height: 100%
  }
  body {
    margin: 0;
    height: 100%;
    background: #fff;
  }
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
