<template>
  <div>
    <Modal v-model="modal.first" :title="title.first">
      <Form :model="owner" label-position="left" :label-width="100">
        <FormItem label="手机号码">
          <input v-model="owner.phone" placeholder="请输手机号码"></input>
        </FormItem>
        <FormItem label="名称">
          <input v-model="owner.name" placeholder="请输入名称"></input>
        </FormItem>
        <FormItem label="密码">
          <input v-model="owner.pwd" placeholder="请输入密码"></input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="emitCancel">取消</Button>
        <Button size="large" @click="emitOkNext">下一步</Button>
      </div>
    </Modal>
    <Modal v-model="modal.second" :title="title.second">
      <Form :model="owner" label-position="left" :label-width="100">
        <FormItem label="公司名称">
          <input v-model="owner.companyName" placeholder="请输公司名称"></input>
        </FormItem>
        <FormItem label="公司简介">
          <input v-model="owner.companyDetail" placeholder="请输入公司简介"></input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="emitOkBack">上一步</Button>
        <Button size="large" @click="emitOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: Object,
      default() {
        return () => { };
      },
    },
    modal: {
      type: Object,
      default() {
        return () => { };
      },
    },
    owner: {
      type: Object,
      default() {
        return () => { };
      },
    },
    cancel: {
      type: Function,
      default() {
        return () => { };
      },
    },
    okNext: {
      type: Function,
      default() {
        return () => { };
      },
    },
    ok: {
      type: Function,
      default() {
        return () => { };
      },
    },
  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    emitCancel() {
      this.$emit('cancel');
    },
    emitOkNext() {
      this.$emit('okNext');
    },
    emitOk() {
      this.$emit('ok');
    },
    emitOkBack() {
      this.$emit('okBack');
    },
  },
};

</script>


<style scoped>
.Table {
  height: 100%;
}

.btn-form {
  margin-left: 15px;
  margin-top: 15px;
}

.self-btn {
  float: right;
}

.m-table {
  height: calc(100% - 72px);
  overflow-y: auto;
}
</style>
