<template>
  <div class="login">
    <div class="box">
      <h2>登录</h2>
      <div>
        <input type="text" placeholder="请输入用户名" v-model="list.username" />
      </div>
      <div>
        <input type="text" placeholder="请输入密码" v-model="list.password" />
      </div>
      <div><button @click="tohome">登录</button></div>
    </div>
  </div>
</template>
<script>
import { reqMangerLogin } from "../../util/request";
export default {
  components: {},
  data() {
    return {
      list: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    tohome() {
      reqMangerLogin(this.list).then((res) => {
        if (res.data.code == 200) {
          sessionStorage.setItem("list", JSON.stringify(this.list));
          // 登录状态的判断,存一个标志
          sessionStorage.setItem("isLogin", 1);
          this.$router.push("/index");
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style lang=''>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #2f3c5f);
}
.box {
  width: 500px;
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, 0);
}
h2 {
  line-height: 80px;
  text-align: center;
}
.box input {
  width: 318px;
  height: 38px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin-bottom: 22px;
}
.box div {
  text-align: center;
}
.box button {
  width: 320px;
  line-height: 40px;
  background: #409eff;
  color: white;
  text-align: center;
  border: none;
  border-radius: 5px;
}
</style>