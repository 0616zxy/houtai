<template>
  <div>
    <el-button type="primary" @click="add" v-model="info.isshow">添加</el-button>

    <v-add :info="info" ref="one"></v-add>

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
        isadd: true,
        title:'角色添加'
      }
    };
  },
  methods: {
    add(){
      this.info.isshow=true,
      this.info.isadd=true;
      this.info.title='角色添加'
      this.$refs.one.empty()
    },
    edit(e) {
      console.log(e);
      this.info.isadd=false;
      this.info.isshow=true
      this.info.title='角色修改'
      this.$refs.one.look(e)
    }
  },
  mounted() {},
};
</script>
<style lang=''>
</style>