<template>
  <div id="Input">
    <el-card class="topbar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          实验室管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item>耗材入库</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="box-card" style="height:100%">
      <h2>耗材入库</h2>
      <el-divider></el-divider>
      
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="耗材名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="耗材描述">
          <el-input
            type="textarea"
            id="desc"
            :autosize="{minRows: 2}"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description">
          </el-input>
        </el-form-item>

        <el-form-item label="耗材数量">
          <el-input-number v-model="form.count" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="入库仓库" prop="repo_id">
          <el-select v-model="form.repo_id" filterable placeholder="请选择入库仓库">
            <el-option
              v-for="item in repo_options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('form')"
            :disabled="formSubmit">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>
    </el-card>
  </div>
</template>

<style>
.topbar {
  margin-bottom: 10px;
  font-size: 1px;
}
</style>

<script>
export default {
  data() {
    return {
      formSubmit: false,
      form: {
        name: "",
        count: "",
        description: "",
        repo_id: "",
        user_id: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入耗材名称', trigger: 'blur'}
        ],
        repo_id: [
          { required: true, message: '请选择入库仓库', trigger: 'blur'}
        ]
      },
      repo_options: []
    };
  },
  created() {
    this.getRepos();
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formSubmit = true;
          this.form.user_id = this.$cookies.get('userId');
          this.$http
            .post("create_consumables", JSON.stringify(this.form))
            .then((res) => {
              if (res.status == 200 && res.data.code == 0) {
                this.$notify({
                  title: "入库成功",
                  message: `成功添加耗材 ${this.form.name} * ${this.form.count}`,
                  type: "success"
                })
              } else if (response.status == 200) {
                this.$message.error('添加耗材时出错 错误代码:' + response.data.code);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.formSubmit = false;
              this.resetForm('form');
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      document.getElementById("desc").value="";
      this.$refs[formName].resetFields();
    },
    getRepos() {
      this.$http
        .get("get_repo_list")
        .then((response) => {
          if (response.status == 200 && response.data.code == 0) {
            this.repo_options = response.data.data
          } else if (response.status == 200) {
            this.repo_options = []
            this.$message.error('获取仓库列表出错 错误代码:' + response.data.code);
          }
        })
        .catch(error => {
          this.repo_options = []
          console.log(error)
        })
    }
  }
};
</script>
