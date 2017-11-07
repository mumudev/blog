<template>
  <div id="app">
    <MHeader></MHeader>
    <div class="main">
      <router-view></router-view>
    </div>
    <MFooter></MFooter>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import MHeader from './common/Header';
import MFooter from './common/Footer';

export default {
  async created() {
    const session = await this.$get('session', {}, false);
    this.setSession(session);
  },
  data() {
    return {};
  },
  components: {
    MHeader,
    MFooter,
  },
  methods: {
    ...mapMutations(['setSession']),
  },
};
</script>

<style scoped>
#app {
  height: 100%;
}
.main {
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 60px - 20px);
}
</style>

<style lang="less">
@import "./theme/index.less";
</style>
