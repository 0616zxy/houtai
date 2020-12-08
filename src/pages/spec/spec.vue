<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>

    <v-add :info="info" ref="one"></v-add>

    <v-list @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
        title: "规格添加",
      },
    };
  },
  methods: {
    willadd() {
      this.info.isshow = true;
      this.info.isadd = true;
      this.info.title = "规格添加";
      this.$refs.one.empty();
    },
    edit(e) {
      this.info.isshow= true
      this.info.isadd = false;
      this.info.title = '规格修改'
      this.$refs.one.look(e)
    }
  },
  mounted() {},
};
</script>
<style lang=''>
</style>