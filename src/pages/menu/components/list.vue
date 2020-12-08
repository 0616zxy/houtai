<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>

      <el-table-column prop="status" label="状态"> 
        <!-- scope相当于一行的数据， scope.row相当于当前行的数据对象。这里就是用插槽 拿到当前行 row是个内置的属性 ，vue slot的scope传递值是父作用域中的源数据改变，值会同步改变。且{{scope.$index}}可以获取当前行的index。 -->
         <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
         <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import {reqMenuDelete} from '../../../util/request'

export default {
  computed:{
    ...mapGetters({
      list:'menu/list'
    })
  },
  components: {},
  data() {
    return {
    
    };
  },
  methods: {
    ...mapActions({
      requestMenuList:'menu/requestMenuList'
    }),
   edit(id){
    //  子传父，将点击了修改这一行的id传给menu
     this.$emit('edit',id)
   },
   del(id){
     reqMenuDelete({id:id}).then(res => {
       this.requestMenuList()
     })
   }

  },
  mounted() {
    this.requestMenuList()
  },
};
</script>
<style lang=''>
</style>