<template>
  <div class="wrapper">
    <h1>Landn172</h1>
    <div class="content">
      <p>
        <a class="link" href="/blog/" target="_blank">Blog</a>
      </p>
      <p>
        <a class="link" href="https://github.com/landn172/" target="_blank">Github</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
body {
  font: 14px 'Lucida Grande', Helvetica, Arial, sans-serif;
}
.text-shadow(@size: 5px) {
  text-shadow: 0px 0px @size*3 #fff, 0px 0px @size*2 #fff, 0 0 @size #fff;
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
    .text-shadow(2px);
  }
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
}
.link {
  color: #000;
}
</style>
