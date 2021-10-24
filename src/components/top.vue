<template>
  <div class="topRoot">
    <img class="img" src="../assets/top.png" alt="" />
    <input
      @keyup.enter="search"
      type="text"
      name="search"
      id=""
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    search() {
      if (this.inputValue == "") {
        this.$message({
          showClose: true,
          message: '请输入内容',
          type: 'warning'
        });
      } else {
        this.$router.push(`/result?name=${this.inputValue}`);
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.img {
  width: 100%;
  height: 60px;
}
</style>
