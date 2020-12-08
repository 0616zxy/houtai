<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <v-add :info='info' ref="one"></v-add>

    <v-list @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'

export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info:{
        isshow: false,
        title: "管理员添加",
        isadd:true,
      }
    };
  },
  methods: {
    add(){
      this.info.isshow=true;
      this.info.isadd= true;
      this.$refs.one.empty();
      this.info.title='管理员添加'
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd= false;
      this.info.title='管理员修改'
      this.$refs.one.look(id)
    }
  },
  mounted() {},
};
</script>
<style lang=''>
</style>