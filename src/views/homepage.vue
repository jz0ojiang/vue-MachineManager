<template>
  <div id="Homepage">
    <el-card class="topbar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          实验室管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="box-card" style="height:100%">
      <div style="margin-left: 50px">
        <p class="title">{{ hoursTip }}，{{ userinfo[0].name }}。</p>
        <p class="subtitle">欢迎使用实验室管理系统。</p>
        <!-- <el-card class="box-card"> -->
        <div v-for="o in 1" :key="o" class="text item">
          <p class="subtitle">
            您的{{ userinfo[o].id }}：{{ userinfo[o].name }}
          </p>
        </div>
        <!-- </el-card> -->
      </div>
    <div class="logblock">
      <p class="subtitle">用户操作日志</p>
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
    </div>

    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    username: String
  },
  data() {
    return {
      hoursTip: " ",
      userinfo: [
        { id: "姓名", name: "name" },
        { id: "工号", name: "0" }
      ],
      tableData: [],
      pageSize: 10,
      currentPage: 1,
    };
  },

  created() {
    this.getMycount();
    this.getActionLog();
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
    getMycount: function() {
      const Base64 = require('js-base64')

      let self = this;
      let date = new Date();

      if (date.getHours() >= 0 && date.getHours() < 12) {
        self.hoursTip = "🌞上午好";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        self.hoursTip = "⛅下午好";
      } else {
        self.hoursTip = "🌙晚上好";
      }
      this.userinfo[0].name = Base64.decode(this.$cookies.get('userName'));
      this.userinfo[1].name = this.$cookies.get('userId');
    },

    getActionLog: function() {
      this.$http.get("get_user_logs", {params: {'id': this.$cookies.get('userId')}})
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.title {
  font-size: 40px;
  font-family: Notosans;
  margin-block-end: 0;
}
.subtitle {
  font-size: 20px;
}
.topbar {
  margin-bottom: 10px;
  font-size: 1px;
}
.logblock {
  margin: 50px;
  border: 1px;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  padding-left: 30px;
}
</style>
