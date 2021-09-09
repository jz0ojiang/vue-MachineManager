<template>
  <div class="logview">
    <el-card class="topbar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          实验室管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item>查看日志</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="box-card" style="height:100%">
      <h2>查看日志</h2>
      <el-divider></el-divider>
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="action_type"
          label="操作类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="action_detail"
          label="详情">
        </el-table-column>
        <el-table-column
          prop="time"
          label="操作时间"
          width="170">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作时间"
          width="170">
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top:10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
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
      tableData: [],
      pageSize: 10,
      currentPage: 1,
    }
  },
  created() {
    this.getLogs();
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
    },
    getLogs() {
      this.$http.get("get_logs_all")
        .then((response) => {
          if (response.status == 200 && response.data.code == 0) {
            this.tableData = response.data.data.reverse()
          } else if (response.status == 200) {
            this.tableData = []
            this.$message.error('获取用户日志时出错 错误代码:' + response.data.code);
          }
        })
        .catch(error => {
          this.tableData = []
          console.log(error)
        })
    }
  }
}
</script>