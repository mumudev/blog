<template>
  <div class="Main">
    <Row :gutter="16">
        <Col span="24">
            <Card dis-hover>
              <div slot="title" class="title">
                  <RadioGroup v-model="tab" type="button">
                    <Radio label="全部"></Radio>
                    <!-- <Radio label="精华"></Radio> -->
                    <Radio label="分享"></Radio>
                    <Radio label="问答"></Radio>
                    <Radio label="招聘"></Radio>
                    <Radio label="求职"></Radio>
                  </RadioGroup>
                  <div class="public-btn">
                    <Button class="" type="primary" v-if="user_status" @click="publicTopic">发布话题</Button>
                  </div>
              </div>
              <Table :show-header="false" :columns="columns" :data="data"></Table>
              <Page :total="page.total" :page-size="page.size" @on-change="changePage" show-total></Page>
            </Card>
        </Col>
        <!-- <Col span="6">
          <Card dis-hover>

          </Card>
        </Col> -->
    </Row>
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  created() {
    this.init();
    moment.locale('zh-cn');
  },
  computed: {
    ...mapGetters(['session', 'user_status']),
  },
  watch: {
    tab() {
      this.init();
    },
  },
  data() {
    return {
      page: {
        total: 0,
        size: 15,
        current: 1,
      },
      tab: '全部',
      columns: [
        {
          title: '头像',
          key: 'head_image_url',
          width: 70,
          render: (h, params) => {
            const row = params.row;
            const { head_image_url = '/static/default_head.png' } = row.owner;
            return h('Avatar', {
              props: {
                shape: 'square',
                src: head_image_url,
              },
              on: {
                click() {
                  console.log(123);
                },
              },
            });
          },
        },
        {
          title: '阅读数',
          width: 120,
          render: (h, params) => {
            const row = params.row;
            const { view_count = 0, comment_count = 0 } = row;
            return `${comment_count}/${view_count}`;
          },
        },
        {
          title: '题目',
          key: 'title',
          render: (h, params) => {
            const row = params.row;
            const self = this;
            return h(
              'Button',
              {
                props: {
                  type: 'text',
                },
                on: {
                  click() {
                    self.$router.push(`/show_topic/${row._id}`);
                  },
                },
              },
              row.title,
            );
          },
        },
        {
          title: '更新时间',
          key: 'createdAt',
          align: 'right',
          width: 200,
          render: (h, params) => {
            const row = params.row;
            return moment(row.createdAt).fromNow();
          },
        },
      ],
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
    publicTopic() {
      this.$router.push('/add_topic');
    },
  },
};
</script>

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
