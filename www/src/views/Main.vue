<template>
  <div class="Main">
    <Row :gutter="40">
      <Col span="18">
      <Card dis-hover style="margin-top:20px; border: 0;">
        <div slot="title">
          <RadioGroup v-model="tab" type="button">
            <Radio label="全部"></Radio>
            <Radio label="分享"></Radio>
            <Radio label="问答"></Radio>
            <Radio label="招聘"></Radio>
            <Radio label="求职"></Radio>
          </RadioGroup>
          <Button type="primary" @click="getData">刷新</Button>
        </div>
        <div slot="extra">
          <Button type="primary" v-show="session.status" @click="publicTopic">发布话题</Button>
        </div>
        <div class="container">
          <Table :show-header="false" :columns="columns" :data="data"></Table>
          <Page :total="page.total" :page-size="page.size" @on-change="changePage" show-total></Page>
        </div>
      </Card>
      </Col>
      <Col span="6">
      <Card style="margin-top:20px;border: 0;" dis-hover v-if="session.status">
        <p>欢迎您！{{session.username}}</p>
      </Card>
      <Card style="margin-top:6px;" dis-hover v-else>
        <p>请登录</p>
      </Card>
      <Card style="margin-top:6px;" dis-hover>
        <div slot="title">
          社区信息
        </div>
        <Button type="text" @click="gotoGitHub">
          <Icon type="social-github"></Icon> GitHub
        </Button>
        <Button type="text">
          Q群：428812779
        </Button>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<style lang="less" scoped>
.Main {
  margin-left: 50px;
  margin-right: 50px;
}
.ivu-card-body {
  padding: 0;
}
.public-btn {
  float: right;
}
.title {
  display: inline;
}
.btns {
  float: left;
}
.item {
  padding: 0;
  height: 50px;
  line-height: 50px;
  .user_head_icon {
    width: 40px;
    height: 40px;
  }
}
</style>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  created() {
    this.init();
    moment.locale('zh-cn');
  },
  computed: {
    haveTab() {
      return this.tab === '全部';
    },
    ...mapGetters(['user_type', 'session', 'locale']),
  },
  watch: {
    tab() {
      this.init();
    },
  },
  data() {
    const columns = [];
    columns.push({
      title: '头像',
      key: 'head_image_url',
      width: 70,
      render: (h, params) => {
        const row = params.row;
        const { head_image_url = '/static/default_head.png' } = row.owner;
        return h('Avatar', {
          props: { shape: 'square', src: head_image_url },
        });
      },
    });
    columns.push({
      title: '阅读数',
      width: 80,
      render: (h, params) => {
        const row = params.row;
        const { view_count = 0, comment_count = 0 } = row;
        return `${comment_count}/${view_count}`;
      },
    });
    columns.push({
      title: '题目',
      key: 'title',
      render: (h, params) => {
        const row = params.row;
        const self = this;
        const content = [];
        if (this.haveTab) {
          content.push(h('Tag', row.tab));
        }
        content.push(
          h(
            'Button',
            {
              props: { type: 'text' },
              on: {
                click() {
                  self.$router.push(`/show_topic/${row._id}`);
                },
              },
            },
            row.title,
          ),
        );
        return h('div', content);
      },
    });
    columns.push({
      title: '更新时间',
      key: 'createdAt',
      align: 'right',
      width: 200,
      render: (h, params) => {
        const row = params.row;
        return moment(row.createdAt).fromNow();
      },
    });

    return {
      page: {
        total: 0,
        size: 15,
        current: 1,
      },
      tab: '全部',
      columns,
      data: [],
    };
  },

  methods: {
    init() {
      this.page = {
        total: 0,
        size: 15,
        current: 1,
      };
      this.getData();
    },
    async getData() {
      let tab = this.tab;
      if (this.tab === '全部') {
        tab = null;
      }
      const limit = this.page.size;
      const page = this.page.current;
      const { docs, total } = await this.$get('topic', { tab, page, limit });
      this.page.total = total;
      this.data = docs;
    },
    changePage(current) {
      this.page.current = current;
      this.getData();
    },
    gotoGitHub() {
      window.open('https://github.com/mumudev/blog');
    },
    publicTopic() {
      this.$router.push('/add_topic');
    },
  },
};
</script>

