<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
      <Card dis-hover>
        <div class="title" slot="title">
          登陆
        </div>
        <Row :gutter="16">
          <Col span="24">
            <FormItem prop="username">
              <Input type="text" v-model="formInline.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')" style="width:100%;">登录</Button>
            </FormItem>
          </Col>
        </Row>
      </Card>
    </Form>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['session']),
  },
  data() {
    return {
      formInline: {
        username: '',
        password: '',
      },
      ruleInline: {
        user: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const user = await this.$post('session', this.formInline);
          this.$router.push('main');
          this.setSession(user);
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
    ...mapMutations(['setSession']),
  },
};
</script>

<style scoped>
.form {
  margin-top: 200px;
  margin-left: calc(50% - 150px);
  width: 300px;
}
</style>
