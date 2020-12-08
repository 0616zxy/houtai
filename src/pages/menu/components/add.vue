<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
            @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option label="购物车" value="el-icon-shopping-cart-2">
              <i class="el-icon-shopping-cart-2"></i>
            </el-option>
            <el-option label="礼物" value="el-icon-present">
              <i class="el-icon-present"></i>
            </el-option>
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="文件" value="el-icon-folder-opened">
              <i class="el-icon-folder-opened"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            
            :active-value="1"
            :inactive-value="2">
          </el-switch>{{ form.status }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {indexRouters} from "../../../router/index";
import { reqMenuAdd, reqMenuListOne, reqMenuEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  // 获取父组件menu传过来的数据
  props: ["info"],
  components: {},
  data() {
    return {
      // isshow: true,
      width: "160px",
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
    };
  },
  methods: {
    //   取消弹框
    hide() {
      this.info.isshow = false;
    },
    //   添加操作
    add() {
      reqMenuAdd(this.form).then((res) => {
        this.hide();
        this.requestMenuList();
      });
    },
    // 修改type的状态
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    // 查看对应id的数据
    look(id) {
      reqMenuListOne(id).then((res) => {
        console.log(res);
        this.form = res.data.list; //将该行数据渲染到弹框
        this.form.id=id
      });
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    // 修改数据后，更新列表，重新发送axios请求，重新渲染一下
    update() {
      reqMenuEdit(this.form).then((res) => {
        this.requestMenuList();
        this.hide();
      });
    },
    empty(){
      this.form={
        pid: "",
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1,
      }
    }
  },
  mounted() {},
};
</script>
<style lang=''>
</style>