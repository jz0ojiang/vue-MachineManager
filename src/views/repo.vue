// 仓库管理
<template>
  <div id="Repo">
    <el-card class="topbar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          实验室管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <el-card class="box-card" style="height:100%">
      <h2>仓库管理</h2>
      <el-divider></el-divider>
      <el-button @click="add_repo_visible = true" >新增仓库</el-button>
      <repoTable :tableData="tableData" />

    </el-card>
    
    <!-- Add Repo Dialog -->
    <el-dialog title="新增仓库" :visible.sync="add_repo_visible">
      <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-position="right"
      label-width="100px">
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" prop="admin">
          <el-input v-model="form.admin"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_repo_visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit('form')"
          :disabled="formSubmit">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .box-card {
    margin-bottom: 10px;
  }
  .topbar {
    margin-bottom: 10px;
  }
</style>

<script>
import repoTable from "@/components/repoTable.vue"
export default {
  components: {
    repoTable
  },
  data() {
    return {
      add_repo_visible: false,
      formSubmit: false,
      tableData: [],
      form: {
        name: "",
        admin: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur'}
        ],
        admin: [
          { required: true, message: '请输入管理员名称', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.getRepoInfo()
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formSubmit = true
          this.$http
            .post("create_repo", JSON.stringify(this.form))
            .then((res) => {
              if (res.status == 200 && res.data.code == 0) {
                this.$notify({
                  title: "添加成功",
                  message: `成功添加仓库`,
                  type: "success"
                })
              } else if (response.status == 200) {
                this.$message.error('添加仓库时出错 错误代码:' + response.data.code);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.formSubmit = false;
              this.resetForm('form');
              this.add_repo_visible = false;
              this.getRepoInfo();
            });
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getRepoInfo() {
      this.$http
        .get("get_repo_list_all")
        .then((res) => {
          if (res.status == 200 && res.data.code == 0) {
            this.tableData = res.data.data;
          } else if (res.status == 200) {
            this.tableData = [];
            this.$message.error('获取仓库列表出错 错误代码:' + response.data.code);
          }
        })
        .catch(error => {
          this.tableData = [];
          console.log(error);
        })
    }
  }
}
</script>