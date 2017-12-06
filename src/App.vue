<template>
  <main id="app">
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: 'app',
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
