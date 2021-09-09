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
            <el-form-item label="出库数量">
              <span>{{ props.row.count }}</span>
            </el-form-item>
            <el-form-item label="仓库ID">
              <span>{{ props.row.repo_id }}</span>
            </el-form-item>
            <el-form-item label="原所属仓库">
              <span>{{ props.row.repo_name }}</span>
            </el-form-item>
            <el-form-item label="耗材描述">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="入库时间">
              <span>{{ props.row.add_time }}</span>
            </el-form-item>
            <el-form-item label="出库时间">
              <span>{{ props.row.remove_time }}</span>
            </el-form-item>
            <el-form-item label="出库理由">
              <span>{{ props.row.reason }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="耗材名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="出库时间"
        prop="remove_time">
      </el-table-column>
      <el-table-column
        label="原所属仓库"
        prop="repo_name"
        :filters="tablefilters"
        :filter-method="filterTag">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "storageTable",
  props: {
    tableData: Array,
    tablefilters: Array
  },
  methods: {
    filterTag(value, row) {
      return row.repo_name === value;
    },
    clickFilter() {
      this.$refs.table.clearFilter();
    }
  }
}
</script>