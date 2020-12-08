<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="list"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
             :active-value="1"
            :inactive-value="2">
          </el-switch>{{form.status}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import {reqRoleAdd,reqRoleListOne,reqRoleEdit,reqRoleList} from '../../../util/request'
export default {
  props:['info'],
  computed:{
    ...mapGetters({
      list:'menu/list',
    })
  },
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        status:1,
        menus:[],
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    hide(){
      this.info.isshow=false
    },
    ...mapActions({
       requestMenuList:'menu/requestMenuList',
       requestRoleList:'role/requestRoleList'
    }),
    add(){
      console.log(this.$refs.tree.getCheckedKeys());
      // getCheckedKeys：若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys(this.form.menus)) 
      reqRoleAdd(this.form)
      this.hide()
      this.requestRoleList()
    },
    // 查看一条数据
    look(id){
      reqRoleListOne(id).then(res =>{
        this.form=res.data.list
        this.form.menus=this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
        this.form.id=id
      })
    },
    // 修改
    update() {
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys(this.form.menus)) 
      reqRoleEdit(this.form).then(res => {
        this.requestRoleList()
      })
      this.hide()    
    },
    // 清空
    empty(){
      this.form={
        rolename: "",
        status:1,
        menus:[],
      };
      this.form.menus = this.$refs.tree.setCheckedKeys([])
    }
  },
  mounted() {
    this.requestMenuList()
  },
};
</script>
<style lang=''>
</style>