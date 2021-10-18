<template>
  <div id="app">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      banner: [],
    };
  },
  created() {
    axios({
      url: "https://wans.vercel.app/banner",
      method: "get",
    }).then((res) => {
      this.banner = res.data.banners;
    });
  },
};
</script>

<style>
</style>