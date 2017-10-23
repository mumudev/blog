<template>
<div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
      <Card dis-hover>
        <div class="title" slot="title">
          注册
        </div>
        <Row :gutter="16">
          <Col span="24">
            <FormItem prop="username">
                <Input type="text" v-model="formInline.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="passwordCheck">
              <Input type="password" v-model="formInline.passwordCheck" placeholder="请重新输入密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')" style="width:100%;">注册</Button>
            </FormItem>
          </Col>
        </Row>
      </Card>
    </Form>
</div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['session']),
  },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formInline.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        username: '',
        password: '',
        passwordCheck: '',
      },
      ruleInline: {
        user: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        passwordCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
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
          const user = await this.$post('user', this.formInline);
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
