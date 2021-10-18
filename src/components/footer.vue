<template>
  <div>
      <audio :src="musicurl" controls="controls" autoplay></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicurl: "",
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

audio {
  width: 800px;
  height: 100px;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>