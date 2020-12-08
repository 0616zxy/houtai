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
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
        <el-button type="primary"  v-if="scope.row.status==1">启用</el-button>
        <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqRoleDelete} from '../../../util/request'
export default {
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
    }),
    edit(id){
      this.$emit('edit',id)

    },
    del(id){
      reqRoleDelete(id)
      this.requestRoleList();
    },
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>
<style lang=''>
</style>