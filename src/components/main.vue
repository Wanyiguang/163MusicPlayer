<template>
  <div class="root">
    <el-container>
      <el-container>
        <el-aside>
          <router-link class="barLink" to="/dis">发现音乐</router-link>
          <router-link class="barLink" to="/list">推荐歌单</router-link>
          <router-link class="barLink" to="/new">最新音乐</router-link>
          <router-link class="barLink" to="/mv">最新MV</router-link>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer>footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.el-main {
  height: 700px;
  background-color: #F2F6FC;
}
.el-aside {
  width: 100px;
  background-color:rgb(229, 233, 242);
}

.el-footer {
  height: 300px;
}
.barLink {
  margin-left: 30px;
  text-decoration: none;
  display: block;
  font-size: 21px;
  color:darksalmon;
  line-height: 2;

}
</style>