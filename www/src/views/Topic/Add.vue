<template>
  <Form ref="form" :model="topic" :rules="ruleTopic" style="height:100%;margin-left:50px;margin-right:50px;">
    <Card dis-hover style="height:100%; border:0;">
      <div slot="title" class="title">
        <Row gutter="20">
          <Col span="18">
            <FormItem prop="title" style="margin-bottom:0px;">
              <Input id="title" v-model="topic.title" placeholder="请输入标题"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem prop="tab" style="margin-bottom:0px;">
              <Select v-model="topic.tab" style="width:100%" placeholder="请选择话题分类">
                <Option v-for="item in tabs" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2">
            <FormItem style="margin-bottom:0px;">
              <Button type="primary" style="width:100%" @click="publish">发布</Button>
            </FormItem>
          </Col>
          <Col span="1">
            <FormItem style="margin-bottom:0px;">
              <Button type="error" style="width:100%" @click="cancel">取消</Button>
            </FormItem>
          </Col>
        </Row>
      </div>
      <FormItem prop="content" style="margin-bottom:0px;height: 100%;">
        <mavon-editor v-model="topic.content" style="height: 100%;z-index: 899;"></mavon-editor>
      </FormItem>
    </Card>
  </Form>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  created() {},
  computed: {
    ...mapGetters(['session']),
  },
  data() {
    return {
      topic: {
        tab: '',
        title: '',
        content: '',
      },
      ruleTopic: {
        tab: [{ required: true, message: '请选择话题分类', trigger: 'blur' }],
        title: [{ required: true, message: '请输入你的标题', trigger: 'blur' }],
        content: [{ required: true, message: '为什么没有内容的?', trigger: 'blur' }],
      },
      tabs: [
        { label: '分享', value: '分享' },
        { label: '问答', value: '问答' },
        { label: '招聘', value: '招聘' },
        { label: '求职', value: '求职' },
      ],
    };
  },
  methods: {
    publish() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const model = await this.$post('topic', this.topic);
          this.$router.push(`/show_topic/${model._id}`);
        }
      });
    },
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>

</style>
