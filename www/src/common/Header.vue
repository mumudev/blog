<template>
  <div>
    <Menu mode="horizontal" :active-name="activeName" @on-select="gotoPage">
      <div class="header">
        <div class="logo-container" @click="gotoPage('/main')">
          <img class="logo" src="../assets/logo.png">
        </div>
        <div class="buttons">
          <MenuItem name="/main">
            首页
          </MenuItem>
          <MenuItem name="/register" v-if="!user_status">
            注册
          </MenuItem>
          <MenuItem name="/login" v-if="!user_status">
            登陆
          </MenuItem>
          <MenuItem name="/info" v-if="user_status">
            消息
          </MenuItem>
          <MenuItem name="/setting" v-if="user_status">
            设置
          </MenuItem>
          <MenuItem name="/logout" v-if="user_status">
            退出
          </MenuItem>
        </div>
      </div>
    </Menu>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user_type', 'session', 'user_status', 'locale']),
  },
  created() {
    this.changeHightLightTab();
  },
  watch: {
    $route() {
      this.changeHightLightTab();
    },
  },
  data() {
    return {
      activeName: '/main',
    };
  },
  methods: {
    gotoPage(name) {
      if (name === '/logout') {
        this.logout();
        return;
      }
      this.$router.push(name);
    },
    changeHightLightTab() {
      const items = this.$route.path.split('/');
      console.log(items);
      const tabName = items[0] || items[1];
      this.activeName = `/${tabName}`;
    },
    async logout() {
      await this.$delete('session');
      this.$router.push('/Main');
      this.setSession();
    },
    ...mapMutations(['setSession', 'setLocale']),
  },
};
</script>

<style scoped>
.header {
  margin-left: 50px;
  margin-right: 50px;
}
.logo-container {
  height: 60px;
  float: left;
}

.logo-container:hover {
  cursor: pointer;
}

.logo {
  width: 60px;
  height: 60px;
  float: left;
}

.title {
  float: left;
  font-size: 20px;
}

.buttons {
  float: right;
}
</style>
