<template>
  <div class="listRoot">
    <div class="header">
      <div class="left">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <p class="title">{{ playlist.name }}</p>
        <p id="desc">{{ playlist.description }}</p>
      </div>
    </div>
    <div class="nav">
      <span :class="{ active: tag == '全部' }" @click="tag = '全部'">全部</span>
      <span :class="{ active: tag == '欧美' }" @click="tag = '欧美'">欧美</span>
      <span :class="{ active: tag == '华语' }" @click="tag = '华语'">华语</span>
      <span :class="{ active: tag == '流行' }" @click="tag = '流行'">流行</span>
      <span :class="{ active: tag == '说唱' }" @click="tag = '说唱'">说唱</span>
      <span :class="{ active: tag == '摇滚' }" @click="tag = '摇滚'">摇滚</span>
      <span :class="{ active: tag == '民谣' }" @click="tag = '民谣'">民谣</span>
      <span :class="{ active: tag == '电子' }" @click="tag = '电子'">电子</span>
      <span :class="{ active: tag == '轻音' }" @click="tag = '轻音'"
        >轻音乐</span
      >
      <span :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'">ACG</span>
      <span :class="{ active: tag == '治愈' }" @click="tag = '治愈'">治愈</span>
      <span :class="{ active: tag == '旅行' }" @click="tag = '旅行'">旅行</span>
    </div>
    <div class="main">
      <el-row :gutter="0" class="box">
        <el-col
          :span="4"
          class="item"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="wrap">
            <div class="imgWrap">
              <img :src="item.coverImgUrl" alt="" />
              <span>{{ item.playCount }}</span>
            </div>
            <p>{{ item.name }}</p>
          </div>
        </el-col>
      </el-row>
      <div class="pagination">
        <el-pagination background
          layout="prev, pager, next"
          @current-change="changePageIndex"
          :total="total"
          :current-page="page"
          :page-size="10"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      playlist: {},
      total: 0,
      page: 1,
      list: [],
      tag: "全部",
    };
  },
  methods: {
    changePageIndex(index) {
      this.page = index;
      this.getMainData();
    },
    getTopData() {
      // 精品获取歌
      axios({
        url: "https://wans.vercel.app/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.tag,
        },
      }).then((res) => {
        this.playlist = res.data.playlists[0];
      });
    },
    getMainData() {
      // 获取歌单列表
      axios({
        url: "https://wans.vercel.app/top/playlist",
        method: "get",
        params: {
          limit: 12,
          offset: (this.page - 1) * 12,
          cat: this.tag,
        },
      }).then((res) => {
        this.list = res.data.playlists;
        this.total = res.data.total;
      });
    },
  },
  computed: {},
  watch: {
    tag() {
      this.getTopData();
      this.getMainData();
    },
  },
  created() {
    this.getTopData();
    this.getMainData();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.left {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
}
.left img {
  width: 200px;
  height: 200px;
}
.right {
  display: inline-block;
  height: 200px;
  width: 800px;
  overflow: hidden;
}
.header {
  height: 260px;
  background-color: rgb(153, 19, 19);
  padding-left: 80px;
  padding-top: 50px;
}
#desc {
  font-size: 10px;
  color: rgb(34, 33, 33);
}
.right .title {
  color: white;
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 20px;
}
.wrap {
  height: 150px;
  width: 200px;
}
.imgWrap {
  position: relative;
}
.imgWrap img {
  height: 120px;
  width: 150px;
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
.nav span {
  line-height: 50px;
  color: rgb(141, 125, 145);
  font-size: 14px;
  margin-right: 5px;
  font-weight: bolder;
}
.nav span:first-child {
  margin-left: 60%;
}
.active {
  color: darkred !important;
}
.pagination{
  width: 500px;
  height: 100px;
  margin: 20px auto;
}
</style>
