<template>
  <div>
    <audio :src="this.$store.state.musicUrl" controls="controls" autoplay></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
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