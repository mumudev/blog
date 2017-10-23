<template>
<div>
  <div class="footer">
    <p>2017@{{$t('author')}} <a href="http://www.miitbeian.gov.cn" class="beian">粤ICP备17116296号-1</a></p>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['session']),
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.footer {
  text-align: center;
  background-color: #ffffff;
  color: #9ea7b4;
}
.beian {
  color: #9ea7b4;
}
</style>
