<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      你好^-^, 张张
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <a href>修改密码</a>
      </el-dropdown-item>
      <el-dropdown-item>
        <a href="/auth/signout">用户退出</a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      userName: state => state.userInfo.nickname
    })
  },
  methods: {}
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
