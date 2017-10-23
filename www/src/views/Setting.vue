<template>
<div>
    <Form ref="userForm" :model="userForm" :rules="ruleInline" class="form">
      <Card dis-hover>
        <div class="title" slot="title">
          设置
        </div>
        <Row :gutter="16">
          <Col span="24">
            <FormItem prop="username">
                <Input type="text" v-model="userForm.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="old_password">
              <Input type="password" v-model="userForm.old_password" placeholder="原密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="password">
              <Input type="password" v-model="userForm.password" placeholder="新密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="passwordCheck">
              <Input type="password" v-model="userForm.passwordCheck" placeholder="请重新输入密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem>
              <Button type="primary" @click="handleSubmit('userForm')" style="width:100%;">注册</Button>
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
  created() {
    this.userForm = this.session;
  },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        username: '',
        old_password: '',
        password: '',
        passwordCheck: '',
      },
      ruleInline: {
        user: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        old_password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        ],
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
          const user = await this.$put('user', this.userForm);
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
