<template>
  <div id="Storage">
    <el-card class="topbar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          实验室管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item>耗材库存</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <el-card class="box-card" style="height:100%">
      <h2>耗材库存</h2>
      <el-divider></el-divider>
      <el-switch
        v-model="tvalue"
        active-text="已出库"
        inactive-text="未出库">
      </el-switch>
      <storageTable
        :tableData="tdata"
        :tablefilters="filters"
        :repo_options="repo_options"
        :repo_names="repo_names"
        v-show="!tvalue"
        class="tables" />
      <usedTable :tableData="odata" :tablefilters="filters" v-show="tvalue" class="tables" />
    </el-card>
  </div>
</template>

<style>
  .tables {
    margin-top: -30px;
  }
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
  .topbar {
    margin-bottom: 10px;
  }
  .box-card {
    margin-bottom: 10px;
  }
</style>

<script>
import storageTable from "@/components/storageTable.vue"
import usedTable from "@/components/usedTable.vue"

export default {
  components: {
    storageTable,
    usedTable
  },
  data() {
    return {
      tvalue: false,
      filters: [],
      odata: [],
      tdata: [],
      repo_options: [],
      repo_names: {}
    }
  },
  methods: {
    getRepos() {
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
      .finally(() => {
        for (var i=0; i < this.repo_options.length; i++) {
          this.repo_names[this.repo_options[i].id] = this.repo_options[i].name;
          this.filters[i] = {text: this.repo_options[i].name, value: this.repo_options[i].name}
        }
      })
    },
    getItems() {
      this.$http.get("get_consumable_list_all")
        .then((response) => {
          if (response.status == 200 && response.data.code == 0) {
            this.tdata = response.data.data
          } else if (response.status == 200) {
            this.tdata = []
            this.$message.error('获取耗材数据出错 错误代码:' + response.data.code);
          }
        })
        .catch(error => {
          this.tdata = []
          console.log(error)
        });
      this.$http.get("get_removed_consumable_list")
        .then((response) => {
          if (response.status == 200 && response.data.code == 0) {
            this.odata = response.data.data.reverse()
          } else if (response.status == 200) {
            this.odata = []
            this.$message.error('获取耗材数据出错 错误代码:' + response.data.code);
          }
        })
        .catch(error => {
          this.odata = []
          console.log(error)
        });
    }
  },
  created() {
    this.getItems();
    this.getRepos();
  }
}
</script>