<template>
  <div class="root">
    <div class="box">
      <el-row class="headline">
        <el-col :span="4" style="visibility: hidden">flag</el-col>
        <el-col :span="6"><span>音乐标题</span></el-col>
        <el-col :span="4"><span>歌手</span></el-col>
        <el-col :span="6"><span>专辑</span></el-col>
        <el-col :span="4"><span>时长</span></el-col>
      </el-row>

      <el-row v-for="(item, index) in song" :key="index">
        <el-col :span="4">
          <span>{{ index + 1 }}</span>
          <img class="img" :src="item.album.blurPicUrl" alt="" />
        </el-col>
        <el-col :span="6">
          <span>{{ item.name }}</span>
        </el-col>
        <el-col :span="4">
          <span>{{ item.artists[0].name }}</span>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      song: [],
    };
  },
  created() {
    axios({
      url: "https://wans.vercel.app/top/song",
      method: "get",
    }).then((res) => {
      console.log(res);
      this.song = res.data.data;
    });
  },
};
</script>

<style>
.headline span {
  color: gray;
}
.box {
  width: 100%;
}
.img {
  width: 80px;
  height: 80px;
}
</style>