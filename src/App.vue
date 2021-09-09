<template>
  <el-container class="site">
    <el-aside width="200px" class="aside" v-if="asideView">
      <div style="background-color:#464646;width:100%;height:100vh">
        <div class="logo">
          <i class="el-icon-s-platform"></i> 实验室管理系统
        </div>
        <el-menu
          :default-active="this.$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/index">首页</el-menu-item>
          <div class="el-menu-item-group__title">耗材维护</div>
          <el-menu-item index="/input">耗材入库</el-menu-item>
          <el-menu-item index="/output">耗材出库</el-menu-item>
          <el-menu-item index="/storage">耗材库存</el-menu-item>
          <el-menu-item index="/repo">仓库管理</el-menu-item>
          <!-- <div class="el-menu-item-group__title">机器&amp;设备管理</div>
          <el-menu-item index="5">设备转入</el-menu-item>
          <el-menu-item index="6">设备转出</el-menu-item>
          <el-menu-item index="7">设备报废</el-menu-item>
          <el-menu-item index="4">实验室管理</el-menu-item> -->
          <!-- 添加/查看/移除 -->
          <div class="el-menu-item-group__title">其他</div>
          <el-menu-item index="/logview">查看日志</el-menu-item>
          <el-menu-item @click="handleDelogin" >退出登录</el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-main style="padding: 0 0 0 200px">
        <div class="bg"></div>
        <div style="padding: 20px">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.aside {
  position: fixed;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}

.logo {
  padding: 20px;
  color: rgb(255, 255, 255);
}

.bg {
  background-color:#e0e0e0;
  width:100vw;
  height:100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: -1;
}
</style>

<script>

export default {
  components: {
  },
  data() {
    return {
      path: "",
      asideView: false,
      Pages: ["/index","/input","/output","/storage","/repo","/logview"]
    };
  },
  mounted() {
    this.path = this.$route.path;
  },
  methods: {
    handleDelogin() {
        this.$cookies.remove('token');
        this.$cookies.remove('userId');
        this.$cookies.remove('userName');
        this.$router.push({path: '/login'});
        this.$notify({
          title: '退出登录',
          message: '成功退出登录',
          type: 'success'
        });
    },
    asideCheck() {
      this.asideView = (this.Pages.indexOf(this.$route.path) > -1);
    }
  },
  created() {
    this.asideCheck();
  },
  watch: {
    $route(to, from) {
      this.asideCheck();
      this.path = to.path
      if (
        !this.$cookies.get('token') || 
        !this.$cookies.get('userId') || 
        !this.$cookies.get('userName')
        ) {
        this.$cookies.remove('token');
        this.$cookies.remove('userId');
        this.$cookies.remove('userName');
        this.$router.push({path: '/login'});
      }
    }
  }
};
</script>
