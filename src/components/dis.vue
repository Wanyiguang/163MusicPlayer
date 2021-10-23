<template>
  <div id="app">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="20" class="box">
      <p>推荐歌单</p>
      <el-col :span="6" class="item" v-for="(item, index) in song" :key="index">
        <div class="wrap">
          <img :src="item.picUrl" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="box">
      <p>推荐新音乐</p>
      <el-col
        :span="6"
        class="item"
        v-for="(item, index) in newsong"
        :key="index"
      >
        <div class="wrap" @click="playMusic(item.id)">
          <img :src="item.picUrl" alt="" />
          <span>{{ item.name }}</span>
          <span class="singerName" v-for="(i,ikey) in item.song.artists" :key="ikey">
            {{ i.name}}
          </span>
        </div>
      </el-col>
    </el-row>
    <!-- mv -->
    <el-row :gutter="20" class="box">
      <p>推荐MV</p>
      <el-col :span="6" class="item" v-for="(item, index) in mv" :key="index">
        <div class="wrap" @click="playMusic(item.id)">
          <img :src="item.picUrl" alt="" />
          <span>{{ item.name }}</span>
          <span>{{ item.artistName }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      banner: [],
      song: [],
      newsong: [],
      mv: [],
    };
  },
  created() {
    axios({
      url: "https://wans.vercel.app/banner",
      method: "get",
    }).then((res) => {
      this.banner = res.data.banners;
    });
    axios({
      url: "https://wans.vercel.app/personalized",
      method: "get",
      params: {
        limit: 8,
      },
    }).then((res) => {
      this.song = res.data.result;
    });
    //推荐音乐
    axios({
      url: "https://wans.vercel.app/personalized/newsong",
      method: "get",
    }).then((res) => {
      this.newsong = res.data.result;
    });
    //推荐mv
    axios({
      url: "https://wans.vercel.app/personalized/mv",
      method: "get",
    }).then((res) => {
      this.mv=res.data.result;
    });
  },
  methods: {
    playMusic(id) {
      axios({
        url: "https://wans.vercel.app/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$store.commit("setUrl", url);
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.item {
}
.item img {
  width: 200px;
  height: 200px;
}
.wrap span {
  display: block;
  font-size: 14px;
}
.box {
  width: 100%;
  height: 500px;
}
.wrap {
}
.box p {
  color: brown;
  font-size: 26px;
  font-weight: bolder;
}
.singerName{
  display: inline !important;
  color:cadetblue;
  font-weight: bolder;
  margin-right: 10px;
}
</style>
