<template>
  <div class="root">
    <el-container>
      <el-header>header</el-header>
      <el-container>
        <el-aside>
          <router-link class="barLink" to="/dis">发现音乐</router-link>
          <router-link class="barLink" to="/mv">推荐MV</router-link>
          <router-link class="barLink" to="/toplist">热歌榜</router-link>
          <router-link class="barLink" to="/"></router-link>
        </el-aside>
        <el-main> main</el-main>
      </el-container>

      <el-footer>footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {

};
</script>

<style>
.root {
  margin: 0;
  padding: 0;
}
.el-header {
  height: 200px;
  background-color: yellow;
}
.el-main {
  background-color: blue;
  height: 500px;
}
.el-aside {
  background-color: red;
  width: 100px;
}

.el-footer {
  height: 300px;
  background-color: darkgreen;
}
.barLink{
  text-decoration: none;
  display: block;
}
</style>