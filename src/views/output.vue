<template>
  <div id="Input">
    <el-card class="topbar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          实验室管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item>耗材出库</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="box-card" style="height:100%">
      <h2>耗材出库</h2>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="仓库选择" prop="repo_id">
          <el-select v-model="form.repo_id" clearable filterable placeholder="请选择" @change="resetItem()">
            <el-option
              v-for="item in repo_options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="耗材名称" prop="item_id">
          <el-select ref="item" v-model="form.item_id" clearable filterable placeholder="请选择" @change="resetCount()">
            <el-option
              v-for="item in items[form.repo_id]"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出库理由">
          <el-input
            type="textarea"
            :rows="2"
            id="reason"
            :autosize="{minRows: 2}"
            placeholder="请输入内容"
            v-model="form.reason">
          </el-input>
        </el-form-item>

        <el-form-item label="出库数量">
          <el-input-number
            ref="count"
            v-model="form.count"
            :min="1"
            :max="max_count">
          </el-input-number>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :disabled="formSubmit">提交</el-button>
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
      max_count: 1,
      form: {
        item_id: '',
        reason: '',
        repo_id: '',
        count: '',
        user_id: ''
      },
      rules: {
        repo_id: [
          { required: true, message: '请选择出库仓库', trigger: 'change'}
        ],
        item_id: [
          { required: true, message: '请选择耗材名称', trigger: 'change'}
        ],
      },
      repo_options: [],
      items: {}
    };
  },
  created() {
    this.getData();
    this.routParam();
  },
  mounted() {
  },
  methods: {
    getData() {
      this.$http
        .get("get_consumable_list")
        .then((res) => {
          if (res.status == 200 && res.data.code == 0) {
            this.items = res.data.data;
          } else if (res.status == 200) {
            this.items = [];
            this.$message.error('获取耗材列表出错 错误代码:' + res.data.code);
          }
        })
        .catch(error => {
          this.items = [];
          console.log(error);
        });
      this.$http.get("get_repo_list")
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
    },
    routParam() {
      if (this.$route.query.item_id) {
        this.form.item_id = Number(this.$route.query.item_id);
        this.form.repo_id = Number(this.$route.query.repo_id);
        this.resetCount();
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formSubmit = true;
            this.form.user_id = this.$cookies.get('userId');
            this.$http
              .post("use_consumables", JSON.stringify(this.form))
              .then((res) => {
                if (res.status == 200 && res.data.code == 0) {
                  this.$notify({
                    title: "出库成功",
                    message: `成功出库耗材`,
                    type: "success"
                  })
                } else if (response.status == 200) {
                  this.$message.error('出库耗材时出错 错误代码:' + response.data.code);
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
      if (this.$route.query.item_id) {
        this.$router.push({ query: {} });
        location.reload();
      }
      document.getElementById("reason").value="";
      this.$refs[formName].resetFields();
    },
    resetItem() {
      this.$set(this.form, 'item_id', '');
    },
    resetCount() {
      this.$set(this.form, 'count', '1');
      this.$http
        .get("get_consumable", {params: {'id': this.form.item_id}})
        .then((response) => {
          if (response.status == 200 && response.data.code == 0) {
            this.max_count = response.data.data.count
          } else if (response.status == 200) {
            this.max_count = 1
            this.$message.error('获取耗材数量时出错 错误代码:' + response.data.code);
          }
        })
        .catch(error => {
          this.max_count = 1
          console.log(error)
        });
    }
  },
  watch: {
    
  }
};
</script>
