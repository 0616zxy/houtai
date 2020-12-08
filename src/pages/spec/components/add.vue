<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="formLabelWidth" v-for="(item,index) in arrAttr" :key="index">
          <el-row>
            <el-col :span="16"><el-input v-model="item.value" autocomplete="off"></el-input></el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
              <el-button type="danger" v-else @click="del(index)">删除</el-button>
            </el-col>
          </el-row>
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
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {reqSpecsAdd,reqSpecsOne,reqSpecsEdit} from '../../../util/request'
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed:{
     ...mapGetters({
    }),
  },
  components: {},
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        specsname: "",
        attrs: '',
        status: 1,
      },
      arrAttr:[
        {value: ''},
        // {value: ''},
      ]
    };
  },
  methods: {
    // 重置
    empty(){
      this.form={
        specsname: "",
        attrs: '',
        status: 1,
      }
      this.arrAttr=[[
        {value: ''},
      ]]
    },
    // 新增属性
    addAttr(){
      this.arrAttr.push({
        value: '',
      })
    },
     // 删除属性
    del(index) {
      this.arrAttr.splice(index,1)
    },
    // 隐藏弹框
    hide() {
      this.info.isshow = false;
    },
    //添加
    add() {
      this.form.attrs=JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      reqSpecsAdd(this.form).then(res=>{
        console.log(111);
        this.empty()
        this.hide();
        this.requestSpecsCount()
        this.requestSpecsList()
      })
      
    },
    look(id){
      reqSpecsOne(id).then(res=>{
        this.form=res.data.list[0];
        this.form.id=id;
        this.arrAttr=JSON.parse(this.form.attrs).map(item=>{return {value:item}});
      })
    },
     ...mapActions({
      requestSpecsCount: "spec/requestSpecsCount",
      requestSpecsList:'spec/requestSpecsList',
    }),
    update() {
       this.form.attrs = JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      reqSpecsEdit(this.form).then(res=>{
        // this.requestSpecsCount()
        this.requestSpecsList()
        this.hide()
      })
    },
  },
  mounted() {

  },
};
</script>
<style lang=''>
</style>