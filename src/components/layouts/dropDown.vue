<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      你好^-^, {{userName}}
      <i class="el-icon-arrow-down el-icon--right"></i>
      <!-- <a-avatar :src="avatar"/> -->
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <a href>修改密码</a>
      </el-dropdown-item>
      <el-dropdown-item @click.native="logout">用户退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      userName: JSON.parse(sessionStorage.getItem("user")).username,
      avatar: JSON.parse(sessionStorage.getItem("user")).avatar
    };
  },
  computed: {
    ...mapState({
      // userName: state => state.userInfo.username
    })
  },
  methods: {
    logout() {
      var _this = this;
      var a = this.$confirm({
        title: "提示",
        content: "确认退出当前登录吗？",
        onOk() {
          console.log("ok");
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-dropdown {
  line-height: 30px;
  height: 30px;
  margin: 25px 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
