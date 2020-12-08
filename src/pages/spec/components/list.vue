<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>

      <el-table-column label="规格属性"> 
        <template slot-scope="scope">
          <el-tag v-for='item in scope.row.attrs' :key="item" style="margin-right:5px">{{item}}</el-tag>
         </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total"
    :current-page="page"
    :page-size="size"
     @current-change='changepage'>
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqSpecsDel} from '../../../util/request'
export default {
  computed: {
    ...mapGetters({
      total: "spec/total",
      list: "spec/list",
      size:'spec/size',
      page: "spec/page",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestSpecsCount: "spec/requestSpecsCount",
      requestSpecsList:'spec/requestSpecsList',
      changeCurrentPage:'spec/changeCurrentPage'
    }),
    //修改当前页码数
    changepage(p){
      // 根据当前第几页去请求数据（去修改vuex中的数据）
      this.changeCurrentPage(p)
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqSpecsDel(id).then(res => {
        this.requestSpecsCount();
        this.requestSpecsList()
        this.changeCurrentPage(1)
      })
    },
  },
  mounted() {
    this.requestSpecsCount();
    this.requestSpecsList()
  },
};
</script>
<style lang=''>
</style>