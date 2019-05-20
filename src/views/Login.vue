<template>
  <div class="wrap">
    <div class="container">
      <section class="header" style="height: 225px;">
        <img src="@/assets/img/login/logo.png" alt="logo">
      </section>
      <section class="content">
        <img src="@/assets/img/login/banner-image.png" alt="banner-image" width="775" height="550">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-container"
        >
          <h3 class="title">系统登录</h3>
          <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleSubmit"
              :loading="logining"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
import { requestLogin } from "@/api";
import { user } from "@/mock/data/user";
import {asyncRoutes} from '../router'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "admin",
        checkPass: "123456"
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          };
          requestLogin(loginParams).then(data => {
            this.logining = false;
            let { msg, code, user } = data;
            if (code !== 200) {
              this.$message.error(msg);
            } else {
              // this.$store.commit("setUserInfo", user);
              sessionStorage.setItem("user", JSON.stringify(user));
              this.$router.push({ path: "/deliveryStates" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  vertical-align: middle;
}
html,
body {
  height: 100%;
}
.wrap {
  background: url("../assets/img/login/login-bg.png") center no-repeat;
  height: 100vh;
  // height: 100%;
  overflow: hidden;
}
.container {
  width: 1200px;
  margin: 0 auto;
  background-color: transparent;
}
.container > .header {
  padding: 60px 0 90px;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-wrap {
  width: 400px;
  padding: 50px 40px;
  border-radius: 10px;
  background-color: #fff;
}
// .login-header {
//   font-size: 18px;
//   color: #61bcf7;
//   font-weight: 500;
// }
// .login-wrap > hr {
//   border: 0;
//   background-color: #61bcf7;
//   height: 2px;
//   margin-top: 6px;
// }
// .login-wrap form {
//   margin-top: 30px;
//   border-radius: 4px;
// }
// .login-wrap form .form-body {
//   border: 1px solid #eee;
// }
// .login-wrap form .form-group {
//   padding: 10px;
// }
// .login-content hr {
//   border: 0;
//   background-color: #eee;
//   height: 1px;
// }
// input {
//   border: none;
//   background-color: transparent;
// }
// input:focus {
//   outline: none;
// }
// .form-group > label {
//   width: 4em;
//   display: inline-block;
//   color: #7f7f7f;
// }
// .form-actions > input {
//   width: 100%;
//   margin-top: 18px;
//   padding: 10px;
//   background-color: #61bcf7;
//   border-radius: 4px;
//   color: #fff;
//   line-height: 1em;
// }
// .form-actions > input:hover {
//   cursor: pointer;
// }
// .form-actions > input:focus {
//   opacity: 0.8;
// }
// .login-footer {
//   margin-top: 16px;
// }
// .login-footer > label {
//   margin-left: 2px;
//   color: #696e72;
// }
// .banner-image {
//   background: url(../assets/img/login/banner-image.png) center no-repeat;
//   width: 600px;
//   height: 500px;
// }
// .login-footer label {
//   font-size: 14px;
// }
// .form-control {
//   font-size: 15px;
// }


.login-container {
  border-radius: 5px;
  background-clip: padding-box;
  // margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>