<template>
  <div class="storagetable">
    <el-button size="medium" @click="clickFilter" style="float: right" plain>清除过滤器</el-button>
    <el-table
      :data="tableData"
      ref="table"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="耗材ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="耗材名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="库存数量">
              <span>{{ props.row.count }}</span>
            </el-form-item>
            <el-form-item label="仓库ID">
              <span>{{ props.row.repo_id }}</span>
            </el-form-item>
            <el-form-item label="所属仓库">
              <span>{{ props.row.repo_name }}</span>
            </el-form-item>
            <el-form-item label="耗材描述">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="入库时间">
              <span>{{ props.row.change_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="耗材名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="库存数量"
        prop="count">
      </el-table-column>
      <el-table-column
        label="所属仓库"
        prop="repo_name"
        :filters="tablefilters"
        :filter-method="filterTag">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            slot="reference"
            size="mini"
            type="danger"
            @click="handleOutput(scope.row)">出库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Add Repo Dialog -->
    <el-dialog title="编辑耗材" :visible.sync="edit_item_visible">
      <el-alert
        title="如果需要减少耗材数量 请使用 [耗材出库] 功能"
        type="info"
        show-icon
        center
        :closable="false"
        style="top: -20px">
      </el-alert>
      <!-- <el-divider></el-divider> -->
      <el-form
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="100px">
        <el-form-item label="耗材名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="耗材数量" prop="count">
          <el-input-number v-model="form.count" :min="min_count"></el-input-number>
        </el-form-item>
        <el-form-item label="所属仓库" prop="repo_id">
          <el-select v-model="form.repo_id" filterable placeholder="请选择">
            <el-option
              v-for="item in repo_options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="耗材描述">
          <el-input
            type="textarea"
            id="desc"
            :rows="2"
            :autosize="{minRows: 2}"
            placeholder="请输入内容"
            v-model="form.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_item_visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "storageTable",
  props: {
    tableData: Array,
    tablefilters: Array,
    repo_options: Array,
    repo_names: {}
  },
  data() {
    return {
      rules: {
        repo_id: [
          { required: true, message: '请选择仓库', trigger: 'change'}
        ],
        name: [
          { required: true, message: '耗材名称不能为空', trigger: 'blur'}
        ],
        count: [
          { required: true, message: '请输入数量', trigger: 'change'}
        ],
      },
      form: {
        "item_id": "",
        "name": "",
        "count": "",
        "description": "",
        "repo_id": "",
        "user_id": "",
      },
      edit_item_visible: false,
      min_count: 1,
    }
  },
  created() {
  },
  methods: {
    handleOutput(row) {
      console.log(row)
      this.$router.push({
        path: "/output",
        query: {
          repo_id: row.repo_id,
          item_id: row.id,
        }
        });
    },
    handleSubmit() {
      this.form.user_id = this.$cookies.get('userId');
      this.$http
        .post("edit_consumables", JSON.stringify(this.form))
        .then((res) => {
          if (res.status == 200 && res.data.code == 0) {
            this.$notify({
              title: "成功修改",
              message: `成功修改耗材 ${this.form.name}`,
              type: "success"
            })
          } else if (response.status == 200) {
            this.$message.error('修改耗材时出错 错误代码:' + response.data.code);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.edit_item_visible = false;
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      console.log(this.form);
    },
    filterTag(value, row) {
      return row.repo_name === value;
    },
    clickFilter() {
      this.$refs.table.clearFilter();
    },
    handleEdit(row) {
      this.form.name = row.name;
      this.form.item_id = row.id;
      this.min_count = row.count;
      this.form.count = row.count;
      this.form.description = row.description;
      this.form.repo_id = Number(row.repo_id);
      this.user_id = this.$cookies.get('userId');

      this.edit_item_visible = true;
    },
  },
}
</script>