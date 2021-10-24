<template>
  <div class="root">
    <div class="box">
      <div class="nav">
        <span @click="tag = 0" :class="{ active: tag == 0 }">全部</span>
        <span @click="tag = 7" :class="{ active: tag == 7 }">华语</span>
        <span @click="tag = 96" :class="{ active: tag == 96 }">欧美</span>
        <span @click="tag = 8" :class="{ active: tag == 8 }">日本</span>
        <span @click="tag = 16" :class="{ active: tag == 16 }">韩国</span>
      </div>
      <el-row class="headline">
        <el-col :span="4" style="visibility: hidden">flag</el-col>
        <el-col :span="6"><span>音乐标题</span></el-col>
        <el-col :span="4"><span>歌手</span></el-col>
        <el-col :span="6"><span>专辑</span></el-col>
        <el-col :span="4"><span>时长</span></el-col>
      </el-row>

      <el-row v-for="(item, index) in song" :key="index">
        <div class="wrap" @click="playMusic(item.id)">
          <el-col :span="4">
            <span class="listIndex">{{ index + 1 }}</span>
            <img class="img" :src="item.album.blurPicUrl" alt="" />
          </el-col>
          <el-col :span="6">
            <span>{{ item.name }}</span>
          </el-col>
          <el-col :span="4">
            <span>{{ item.artists[0].name }}</span>
          </el-col>
          <el-col :span="6">{{ item.album.name }}</el-col>
          <el-col :span="4">{{  item.duration}}</el-col>
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
      song: [],
      tag: 0,
    };
  },
  methods: {
    playMusic(id) {
      let url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$store.commit("setUrl", url);
    },
    //获取歌曲列表
    getData() {
      axios({
        url: "https://wans.vercel.app/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        this.song = res.data.data;
        for (let i = 0; i < this.song.length; i++) {
          let duration = this.song[i].duration;
          let min = parseInt(duration / 1000 / 60);
          let sec = parseInt((duration / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.song[i].duration = `${min}分${sec}秒`;
          
        }
      });
    },
  },
  watch: {
    tag() {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.headline {
  margin-bottom: 10px;
}
.headline span {
  color: gray;
}
.box {
  width: 100%;
}
.img {
  width: 100px;
  height: 100px;
}
.listIndex {
  margin-bottom: 20px;
}
.wrap {
}
.nav span {
  font-size: 16px;
  color: darkgray;
  margin-right: 10px;
}
.nav {
  padding-left: 73%;
  margin-bottom: 10px;
}
.active {
  color: brown !important;
  font-weight: bold;
}
</style>
