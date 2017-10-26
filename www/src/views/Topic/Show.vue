<template>
  <div style="height:100%; margin-left:50px;margin-right:50px;">
    <Row :gutter="40">
      <Col :span="18">
      <Card dis-hover style="border:0;margin-bottom:0;">
        <div slot="title" class="title">
          <h1>{{topic.title}}</h1>
          <p style="margin-top:5px; font-weight:lighter;">
            <strong>发布时间:</strong>{{moment(topic.createdAt).format('LLL')}}
          </p>
        </div>
        <Button type="text" slot="extra" v-if="isAuthor" @click="edit">
          编辑
        </Button>
        <mavon-editor class="show-markdown" default_open="preview" v-model="topic.content" code_style="code-hybrid" style="height: 100%;" :scrollStyle="false" :editable="false" :subfield="false" :toolbarsFlag="false"></mavon-editor>
      </Card>

      <Card dis-hover style="margin-left:15px;margin-right:15px;">
        <div slot="title">
          回复
        </div>
        <div class="no-coment" v-if="!topic.comment.length">没有回复诶，来评论下吧！</div>
        <div v-for="item in topic.comment" :key="item._id" class="item">
          <div>
            <Avatar shape='square' :src="item.owner.head_image_url||'/static/default_head.png'"></Avatar>
            <span style="text-align:center;height：60px; line-height:60px">{{item.owner.username}}</span>
            {{moment(item.createdAt).format('LLL')}}
            <Button type="text" slot="extra" v-if="item.owner._id===session._id" @click="deleteComment(item._id)">
              删除
            </Button>
          </div>
          <div class="comment-content">
            {{item.content}}
          </div>
        </div>
      </Card>
      <Form>
        <Card dis-hover style="border:0;">
          <mavon-editor default_open="edit" v-model="comment" code_style="code-hybrid" :subfield="false"></mavon-editor>
          <Button type="primary" style="margin-top:15px;" @click="publishComment">评论</Button>
        </Card>
      </Form>
      </Col>
      <Col :span="6">
      <Card style="margin-top:20px;" dis-hover v-if="session.status">
        <div slot="title">
          作者
        </div>
        <p>
          <Avatar shape='square' :src="topic.owner.head_image_url||'/static/default_head.png'"></Avatar>
          <span>{{topic.owner.username}}</span>
        </p>
        <p>{{topic.owner.motto|| '“ 这家伙很懒，什么个性签名都没有留下。 ”'}}</p>
      </Card>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.getData();
  },
  computed: {
    isAuthor() {
      const topicAuthorId = this.topic.owner._id;
      if (!this.session) {
        return false;
      }
      return topicAuthorId === this.session._id;
    },
    ...mapGetters(['session']),
  },
  data() {
    return {
      topic: {
        title: '',
        content: '',
      },
      comment: '',
    };
  },
  methods: {
    async getData() {
      const { id } = this.$route.params;
      this.topic = await this.$get(`topic/${id}`);
    },
    edit() {
      this.$router.push(`/edit_topic/${this.topic._id}`);
    },
    async publishComment() {
      const comment = {
        topic_id: this.topic._id,
        content: this.comment,
      };
      await this.$post('comment', comment);
      this.comment = '';
      this.getData();
    },
    async deleteComment(id) {
      await this.$delete(`comment/${id}`);
      this.getData();
    },
  },
};
</script>

<style lang="less">
.show-markdown {
  .v-note-panel {
    box-shadow: none !important;
  }
}
.item {
  border-bottom: 1px solid #eee;
  margin-top: 5px;
}
</style>
