<template>
  <div id="MVroot">
    <div class="nav">
      <div class="row">
        <span>地区:</span>
        <span @click="area = '全部'" :class="{ active: area == '全部' }"
          >全部</span
        >
        <span @click="area = '内地'" :class="{ active: area == '内地' }"
          >内地</span
        >
        <span @click="area = '港台'" :class="{ active: area == '港台' }"
          >港台</span
        >
        <span @click="area = '日本'" :class="{ active: area == '日本' }"
          >日本</span
        >
        <span @click="area = '韩国'" :class="{ active: area == '韩国' }"
          >韩国</span
        >
      </div>
      <div class="row">
        <span>类型:</span>
        <span @click="type = '全部'" :class="{ active: type == '全部' }"
          >全部</span
        >
        <span @click="type = '官方版'" :class="{ active: type == '官方版' }"
          >官方版</span
        >
        <span @click="type = '原声'" :class="{ active: type == '原声' }"
          >原声</span
        >
        <span @click="type = '现场版'" :class="{ active: type == '现场版' }"
          >现场版</span
        >
        <span @click="type = '网易出品'" :class="{ active: type == '网易出品' }"
          >网易出品</span
        >
      </div>
      <div class="row">
        <span>排序:</span>
        <span
          @click="order = '上升最快'"
          :class="{ active: order == '上升最快' }"
          >上升最快</span
        >
        <span @click="order = '最热'" :class="{ active: order == '最热' }"
          >最热</span
        >
        <span @click="order = '最新'" :class="{ active: order == '最新' }"
          >最新</span
        >
      </div>
      <div class="row"></div>
    </div>
    <el-row :gutter="20" class="box">
      <el-col :span="6" class="item" v-for="(item, index) in mv" :key="index">
        <div class="wrap">
          <img :src="item.cover" alt="" />
          <span class="count">{{ item.playCount }}</span>
        </div>
        <p>{{ item.name }}</p>
        <p>{{ item.artistName }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mv: [],
      area: "全部",
      type: "全部",
      order: "上升最快",
      total: 10,
      page: 1,
    };
  },
  method: {
    changeArea() {},
    changeType() {},
  },
  created() {
    axios({
      url: "http://wans.vercel.app/mv/all",
      methoid: "get",
      params: {
        limit: 8,
      },
    }).then((res) => {
      this.mv = res.data.data;
      console.log(res);
      //对播放量的处理
      for (let i = 0; i < this.mv.length; i++) {
        let count = this.mv[i].playCount;
        if (count > 1000000) {
          this.mv[i].playCount = `${parseInt(
            this.mv[i].playCount / 1000000
          )}万`;
        }
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
.wrap {
  position: relative;
}
.wrap img {
  width: 150px;
  height: 100px;
}
.count {
  position: absolute;
  top: 0;
  left: 0;
  color: aliceblue;
  font-size: 8px;
}
.active {
  color: brown !important;
  font-weight: bolder;
}
.nav .row span{
  margin-right: 10px;
  display: inline-block;
}
</style>
