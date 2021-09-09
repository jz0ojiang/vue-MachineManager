<template>
  <div class="login">
    <el-card class="login-card">
      <h1>实验室管理系统 | 登录</h1>
      <el-divider></el-divider>
      <el-form
      :model="loginform"
      :rules="rules"
      ref="loginform"
      label-position="right"
      label-width="60px">
        <el-form-item label="工号" prop="id">
          <el-input
            type="text"
            v-model="loginform.id"
            name="username"
            placeholder="请输入工号">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginform.password"
            autocomplete="off"
            placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            style="width:240px; margin-left:-60px"
            @click="handleLogin('loginform')">登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.login {
  margin-left: -200px;
  top: 0px;
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  width: 400px;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      loginform: {
        id: "",
        password: ""
      },
      rules: {
        id: [
          { required: true, message: '请输入工号', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleLogin(formName) {
      const Base64 = require('js-base64')
      const sha256 = require('js-sha256').sha256
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginform.password = sha256(this.loginform.password)
          axios
            .post("../login", JSON.stringify(this.loginform))
            .then((response) => {
              if (response.status == 200 && response.data.code == 0) {
                this.$cookies.set('token', response.data.data.token);
                this.$cookies.set('userId', response.data.data.userId);
                this.$cookies.set('userName', Base64.encode(response.data.data.userName));

                this.$router.push({path: '/index'});
                this.$notify({
                  title: '登录成功',
                  message: '欢迎回来，' + response.data.data.userName,
                  type: 'success'
                });
              } else {
                if (response.data.code == 1001) {
                  this.$notify({
                    title: '登录失败',
                    message: '工号或密码错误',
                    type: 'error'
                  });
                } else {
                  this.$notify({
                    title: '登录失败',
                    message: '未知错误',
                    type: 'error'
                  });
                }
              }
            }).catch(function (error) {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    }
  }
}
</script>