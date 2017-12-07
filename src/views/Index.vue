<template>
  <div class="wrapper">
    <h1>Lord.space</h1>
    <p>
      <a class="link" href="/blog/">blog</a>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
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
