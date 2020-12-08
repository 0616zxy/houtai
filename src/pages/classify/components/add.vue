<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" v-if="form.pid!=0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
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
import { reqClassifyAdd,reqClassifyOne,reqClassifyEdit} from "../../../util/request";
import {mapGetters,mapActions} from 'vuex'
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list:'classify/list'
    })
  },
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestClassifyList:'classify/requestClassifyList',
    }),
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl=''
    },
    changeImg(e) {
      console.log(e);
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    hide() {
      this.info.isshow = false;
    },
    add() {
      reqClassifyAdd(this.form).then((res) => {
        console.log(11);
        this.hide();
        this.empty();
        this.requestClassifyList();
      });
    },
    look(id){
      reqClassifyOne(id).then(res=>{
        this.form = res.data.list
        this.form.id=id;
        this.imageUrl = this.preImg+res.data.list.img
      })
    },
    update(){
      console.log(11);
      reqClassifyEdit(this.form).then(res=>{
        this.requestClassifyList()
        this.hide()
      })
    },
  },
  mounted() {
    this.requestClassifyList()
  },
};
</script>
<style lang=''>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>