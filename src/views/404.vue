<template>
<div class="pagebox">
  <el-card class="card">
    <img alt="404 Icon" src="../assets/logo.svg" class="icon" />
    <h1 class="pgnotfound">404</h1>
    <p><strong>找不到页面</strong></p>
    <el-button size="small" @click="toIndex">回到主页</el-button>
  </el-card>
</div>
</template>

<script>
export default {
  methods: {
    toIndex() {
      this.$router.push({path: "/"})
    }
  }
}
</script>

<style>
.pgnotfound {
  font-size: 5em;
  margin-bottom: 0;
}
.icon {
  float: left;
  display: inline-flex;
  margin: 25px;
  margin-left: 50px;
  width: 20%;
  justify-content: center;
}
.pagebox {
  margin: 0 auto;
  margin-left: -200px;
  top: 0px;
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 60%;
  height: 40%;
  text-align: center;
}
</style>