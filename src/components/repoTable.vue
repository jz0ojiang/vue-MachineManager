<template>
  <div id="RepoTable">
    <el-table
      :data="tableData"
      ref="table"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="仓库ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="仓库名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="管理员">
              <span>{{ props.row.admin }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.add_time }}</span>
            </el-form-item>
            <el-form-item label="修改时间">
              <span>{{ props.row.change_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="仓库名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="管理员"
        prop="admin">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="add_time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
          type="danger"
          confirm-button-type="danger"
          confirm-button-text="删除"
          title="此操作将会删除该仓库，确定删除吗？"
          icon="el-icon-error"
          @confirm="handleDelete(scope.row)">
            <el-button
              slot="reference"
              size="mini"
              type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- Add Repo Dialog -->
    <el-dialog title="编辑仓库" :visible.sync="edit_repo_visible">
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
        <el-button @click="edit_repo_visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')" :disabled="formSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
export default {
  name: "repoTable",
  props: {
    tableData: Array,
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formSubmit = true;
          this.$http
            .post("edit_repo", JSON.stringify(this.form))
            .then((res) => {
              if (res.status == 200 && res.data.code == 0) {
                this.$notify({
                  title: "编辑成功",
                  message: `成功编辑仓库`,
                  type: "success"
                })
              } else if (response.status == 200) {
                this.$message.error('编辑仓库时出错 错误代码:' + response.data.code);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.add_repo_visible = false;
              this.formSubmit = false;
              setTimeout(() => {
                location.reload();
              }, 1000);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelete(row) {
      console.log(row);
      this.$http
        .post("delete_repo", {id: row.id})
        .then((res) => {
              if (res.status == 200 && res.data.code == 0) {
                this.$notify({
                  title: "删除成功",
                  message: `成功删除仓库`,
                  type: "success"
                })
              } else if (response.status == 200) {
                switch (res.data.code) {
                  case 1004:
                    this.$notify.error({
                      title: '错误',
                      message: '不能删除一个有耗材的仓库'
                    });
                  case 1003:
                    this.$notify.error({
                      title: '错误',
                      message: '没有找到这个仓库'
                    });
                  default:
                    this.$message.error('删除仓库时出错 错误代码:' + res.data.code);
                }
              }
            })
            .catch((err) => {
              if (err.response.status == 400)
              console.log(err);
            })
            .finally(() => {
              setTimeout(() => {
                location.reload();
              }, 1000);
            });
    },
    handleEdit(row) {
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.admin = row.admin;
      this.edit_repo_visible = true;
    }
  },
  data() {
    return {
      edit_repo_visible: false,
      formSubmit: false,
      form: {
        id: "",
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
  }
}
</script>