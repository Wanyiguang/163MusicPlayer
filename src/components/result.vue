<template>
  <div class="resultRoot">
    <h1>{{ this.$route.query.name }}</h1>
    <span>共找到{{ resultCount }}个结果</span>
    <div class="nav">
      <span @click="type = 1" :class="{ active: type == 1 }">歌曲</span>
      <span @click="type = 1000" :class="{ active: type == 1000 }">歌单</span>
      <span @click="type = 1004" :class="{ active: type == 1004 }">MV</span>
    </div>
    <div class="list">
      <el-row>
        <div class="wrap">
          <el-col :span="6">
            <span>音乐标题</span>
          </el-col>
          <el-col :span="4">
            <span>歌手</span>
          </el-col>
          <el-col :span="10">
            <span>专辑</span>
          </el-col>
          <el-col :span="4">
            <span>时长</span>
          </el-col>
        </div>
      </el-row>
      <el-row v-for="(item, index) in result" :key="index">
        <div class="wrap" @dblclick="playMusic(item.id)">
          <el-col :span="6">
            <span class="listIndex">{{ index + 1 }}</span>
            <span>{{ item.name }}</span>
            <span v-if="item.mvid != 0" class="el-icon-video-play"></span>
          </el-col>
          <el-col :span="4">
            <span
              v-for="(titleItem, titleIndex) in item.artists"
              :key="titleIndex"
              >{{ titleItem.name }}</span
            >
          </el-col>
          <el-col :span="10">
            <span>{{ item.album.name }}</span>
          </el-col>
          <el-col :span="4">{{ item.duration }}</el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      result: [],
      type: 1,
      resultCount: 0,
    };
  },
  watch: {
    type() {
      console.log(this.type);
      if (this.type == 1) {
      } else if (this.type == 1000) {
      } else {
      }
    },
  },
  methods: {
    playMusic(id) {
      let url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$store.commit("setUrl", url);
    },
  },
  created() {
    axios({
      url: "https://wans.vercel.app/search",
      method: "get",
      params: {
        keywords: this.$route.query.name,
        type: this.type,
        limit: 10,
      },
    }).then((res) => {
      console.log(res);
      this.result = res.data.result.songs;
      this.resultCount = res.data.result.songCount;

      for (let i = 0; i < this.result.length; i++) {
        let duration = this.result[i].duration;
        let min = parseInt(duration / 1000 / 60);
        let sec = parseInt((duration / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.result[i].duration = `${min}分${sec}秒`;
      }
    });
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.active {
  color: brown !important;
}
.nav span {
  line-height: 50px;
  color: rgb(141, 125, 145);
  font-size: 14px;
  margin-right: 5px;
  font-weight: bolder;
}
</style>
