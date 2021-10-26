<template>
  <div class="resultRoot">
    <h1>{{ searchTarget }}</h1>
    <span>共找到{{ resultCount }}个结果</span>
    <div class="list">
      <el-tabs v-model="activeName" @tab-click="tagChange">
        <el-tab-pane label="歌曲" name="song">
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
          <el-row class="wrap" v-for="(item, index) in result" :key="index">
            <!-- 歌曲列表 -->
            <div @dblclick="playMusic(item.id)">
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
        </el-tab-pane>
        <el-tab-pane label="歌单" name="list">
          <!-- 歌单 -->
          <el-row :gutter="0" class="box">
            <el-col
              :span="6"
              class="item"
              v-for="(item, index) in songlist"
              :key="index"
              @click="playList(item.id)"
            >
              <div class="wrap">
                <div class="imgWrap">
                  <img :src="item.coverImgUrl" alt="" />
                  <span>{{ item.playlistCount }}</span>
                </div>
                <p>{{ item.name }}</p>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- MV -->
        <el-tab-pane label="MV" name="mv">
          <el-row :gutter="0" class="box">
            <el-col
              :span="6"
              class="item"
              v-for="(item, index) in mv"
              :key="index"
            >
              <div class="wrap">
                <div class="imgWrap">
                  <img :src="item.cover" alt="" />
                  <span>{{ item.playCount }}</span>
                </div>
                <p>{{ item.name }}</p>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeName: "song",
      limit: 8,
      //歌曲容器
      result: [],
      //数据类型   歌曲1,歌单1000,mv1004
      type: 1,
      resultCount: 0,
      //歌单容器
      songlist: [],
      //mv容器
      mv: [],
    };
  },
  watch: {
    type() {
      if (this.type == 1) {
      }
      if (this.type == 1000) {
        axios({
          url: "https://wans.vercel.app/search",
          method: "get",
          params: {
            keywords: this.$route.query.name,
            type: this.type,
            limit: this.limit,
          },
        }).then((res) => {
          this.songlist = res.data.result.playlists;
          this.resultCount = res.data.result.playlistCount;
          for (let i = 0; i < this.songlist.length; i++) {
            let duration = this.songlist[i].duration;
            let min = parseInt(duration / 1000 / 60);
            let sec = parseInt((duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.songlist[i].duration = `${min}分${sec}秒`;
          }
        });
      } else {
        axios({
          url: "https://wans.vercel.app/search",
          method: "get",
          params: {
            keywords: this.$route.query.name,
            type: this.type,
            limit: this.limit,
          },
        }).then((res) => {
          this.mv = res.data.result.mvs;
          this.resultCount = res.data.result.mvCount;
          for (let i = 0; i < this.mv.length; i++) {
            let duration = this.mv[i].duration;
            let min = parseInt(duration / 1000 / 60);
            let sec = parseInt((duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.mv[i].duration = `${min}分${sec}秒`;
          }
        });
      }
    },
  },
  computed: {
    searchTarget: function() {
      if (this.type == 1) {
        axios({
          url: "https://wans.vercel.app/search",
          method: "get",
          params: {
            keywords: this.$route.query.name,
            type: this.type,
            limit: this.limit,
          },
        }).then((res) => {
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
      }
      return this.$route.query.name;
    },
  },
  methods: {
    playMusic(id) {
      let url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$store.commit("setUrl", url);
    },
    tagChange() {
      switch (this.activeName) {
        case "song":
          this.type = 1;
          break;
        case "list":
          this.type = 1000;
          break;
        case "mv":
          this.type = 1004;
          break;
        default:
          break;
      }
    },
    playList(id){
      console.log(id);
    }
  },
  created() {
    axios({
      url: "https://wans.vercel.app/search",
      method: "get",
      params: {
        keywords: this.$route.query.name,
        type: this.type,
        limit: this.limit,
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
.listIndex {
  margin-right: 5px;
  color: #606266;
}
.wrap:nth-child(2n-1) {
  background-color: #e4e7ed;
}
.imgWrap img {
  width: 150px;
  height: 150px;
}
.imgWrap {
  position: relative;
}

.wrap p {
  font-size: 8px;
  width: 150px;
}
.imgWrap span {
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: 10px;
  background-color: black;
  display: block;
  text-align: center;
  opacity: 0.5;
}
</style>
