<template>
  <div class="wrapper">
    <h1>Lord.Space</h1>
    <p>
      <a class="link" href="/blog/">BLOG</a>
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
<style lang="less">
  body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  }
  .text-shadow(@size: 5px) {
    text-shadow: 0px 0px @size*3 #FFF, 0px 0px @size*2 #FFF, 0 0 @size #FFF;
  }
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    z-index: 10;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    /* background-color: rgba(255, 255, 255, .5); */
    padding: 15px;
    border-radius: 10px;
    .text-shadow(5px);
    .link {
      .text-shadow(2px)
    }
  }
  .link {
    color: #000;
  }
</style>
