<template>
  <div>
     <el-button type="primary" @click="willAdd">添加</el-button>

     <v-add :info="info" ref="one"></v-add>

     <v-list @edit="edit"></v-list>
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
        isAdd:true, //给添加按钮增加一个标识 用来判断弹框中的按钮到底是添加还是编辑
        title:'菜单添加'
      }
    };
  },
  methods: {
    // 点击添加
    willAdd(){
      this.info.isshow = !this.info.isshow;
      this.info.isAdd = true
      this.info.title='菜单添加'
      this.$refs.one.empty()
    },
    // 编辑修改,拿到点击了修改那一行的id
    edit(e){
      console.log(e);
      // 点击编辑，显示添加框
      this.info.isshow = true;
      this.info.isAdd = false
      this.info.title='菜单修改'
      // 通过ref方式，调用add中的look方法，将id传过去
      this.$refs.one.look(e)
      
      
      
     
    }
  },
  mounted() {},
};
</script>
<style lang=''>
</style>