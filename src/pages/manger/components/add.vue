<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="--请选择--">
            <el-option label="请选择" :value="0" disabled></el-option>
             <!-- 动态循环添加数据  菜单分类 -->
            <el-option :label="item.rolename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
          </el-switch>
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
import {reqUseAdd,reqUserOne,reqUserEdit} from '../../../util/request'
import {mapGetters,mapActions} from 'vuex'

export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list :'role/list',
    })
  },
  components: {},
  data() {
    return {
      form: {
        roleid: '',
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    empty(){
      this.form={
        roleid: '',
        username: "",
        password: "",
        status: 1,
      }
    },
    ...mapActions({
      requestRoleList:'role/requestRoleList',
      requestUserCount:'manger/requestUserCount',
      requestUserList:'manger/requestUserList',
    }),
    hide() {
      this.info.isshow = false;
    },
    add() {
      reqUseAdd(this.form)
      this.hide();
      this.requestUserCount()
      this.requestUserList()
    },
    look(id){
      reqUserOne(id).then(res=>{
        this.form=res.data.list;
        this.form.uid = id
        this.form.password=''
      })
    },
    update(){
      reqUserEdit(this.form).then(res=>{
        this.requestUserList()
        this.hide();
      })
     
    }
  },
  mounted() {
    this.requestRoleList()
  },
};
</script>
<style lang=''>
</style>