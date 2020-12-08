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
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="size"
      @current-change='changepage'
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqUserDel} from '../../../util/request'
export default {
  computed: {
    ...mapGetters({
      total: "manger/total",
      list: "manger/list",
      page: "manger/page",
      size: "manger/size",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.$emit("edit", id)
    },
    del(id) {
      reqUserDel(id).then(res=>{ 
        this.requestUserList();
        this.requestUserCount();
       // 强制让页码数回到第一页
        this.changeCurrentPage(1)
      })
     
    },
    ...mapActions({
      requestUserCount: "manger/requestUserCount",
      requestUserList: "manger/requestUserList",
      changeCurrentPage: "manger/changeCurrentPage",
    }),
    //修改当前页码数
    changepage(p){
      console.log(p);
      // 根据当前第几页去请求数据（去修改vuex中的数据）
      this.changeCurrentPage(p)
    }
  },
  mounted() {
    this.requestUserCount();
    this.requestUserList();
  },
};
</script>
<style lang=''>
</style>