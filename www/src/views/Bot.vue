<template>
  <div>
    <div v-if="!wechatBot.isLogin" class="qrcode">
      <img :src="qrcode_src" alt="">
    </div>
    <div v-else style="margin-top:40px;">
      <Row>
        <Col offset="1" span="10">
          <Button @click="submit" type="success">提交</Button>
          <Table :columns="columns" :data="messages" style="margin-top:20px;"></Table>
        </Col>
        <Col offset="2" span="10">
          <Row>
            <Col offset="1" span="23" style="margin-bottom:20px;">
              <Button @click="add" type="success">增加</Button>
            </Col>
            <Col offset="1" span="10">
              <Input id="title" v-model="key" placeholder="关键字"></Input>
            </Col>
            <Col offset="2" span="10">
              <Input id="title" v-model="message" placeholder="答复"></Input>
            </Col>
            <Col span="24">
            </Col>
          </Row>
        </Col>
      </Row>
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
    ...mapGetters(['session'])
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
    }
  },
  data() {
    return {
      key: '',
      message: '',
      qrcode_src: '',
      wechatBot: {
        isLogin: false
      },
      columns: [
        {
          title: '关键字',
          key: 'key'
        },
        {
          title: '自动回复',
          key: 'message'
        }
      ],
      messages: []
    };
  }
};
</script>

<style scoped>
.qrcode {
  margin-left: 30%;
  margin-top: 200px;
}
</style>
