<template>
  <div id="app">
    <Top></Top>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>

import Main from "./components/main.vue";
import Top from "./components/top.vue";
import Footer from "./components/footer.vue";

export default {
  components: {
    Main,
    Top,
    Footer,
  },
};
</script>

<style></style>
