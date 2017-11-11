<template>
  <div>
    <div v-if="!wechatBot.isLogin">
      <img :src="qrcode_src" alt="">
    </div>
    <div v-else>
      <Table :columns="columns" :data="messages"></Table>
      <div v-for="item in messages" :key="item"></div>
      <Input id="title" v-model="key" placeholder="请输入标题"></Input>
      <Input id="title" v-model="message" placeholder="请输入标题"></Input>
      <Button @click="add">增加</Button>
      <Button @click="submit">提交</Button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import qrcode from 'jr-qrcode';

export default {
  async created() {
    this.wechatBot = await this.$get('wechatBot');
    this.qrcode_src = qrcode.getQrBase64(this.wechatBot.uuid);
    this.i = setInterval(async () => {
      this.wechatBot = await this.$get('wechatBot');
      this.qrcode_src = qrcode.getQrBase64(this.wechatBot.uuid);
    }, 2000);
  },
  destroyed() {
    clearInterval(this.i);
  },
  computed: {
    ...mapGetters(['session']),
  },
  methods: {
    add() {
      const key = this.key;
      const message = this.message;
      this.messages.push({ key, message });
    },
    async submit() {
      const messages = this.messages;
      await this.$post('wechatBot', { messages });
    },
  },
  data() {
    return {
      key: '',
      message: '',
      qrcode_src: '',
      wechatBot: {
        isLogin: false,
      },
      columns: [
        {
          title: '关键字',
          key: 'key',
        },
        {
          title: '自动回复',
          key: 'message',
        },
      ],
      messages: [],
    };
  },
};
</script>

<style scoped>

</style>
