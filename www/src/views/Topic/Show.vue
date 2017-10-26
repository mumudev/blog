<template>
<div style="height:100%; margin-left:50px;margin-right:50px;">
    <Card dis-hover style="border:0;margin-bottom:0;">
      <div slot="title" class="title">
        <h1>{{topic.title}}</h1>
        <p style="margin-top:5px; font-weight:lighter;">
          <strong>作者:</strong>{{topic.owner.username}}&nbsp;&nbsp;&nbsp;
          <strong>发布时间:</strong>{{moment(topic.createdAt).format('LLL')}}
        </p>
      </div>
      <Button type="text" slot="extra" v-if="isAuthor" @click="edit">
        编辑
      </Button>
      <mavon-editor class="show-markdown" default_open="preview" v-model="topic.content"  code_style="code-hybrid" style="height: 100%;" :scrollStyle="false" :editable="false" :subfield="false" :toolbarsFlag="false"></mavon-editor>
    </Card>

    <Card  dis-hover style="margin-left:15px;margin-right:15px;">
      <div slot="title">
        回复
      </div>
      <div class="no-coment" v-if="!topic.comment.length">没有回复诶，来评论下吧！</div>
      <div v-for="item in topic.comment" :key="item._id" class="item">
        <div>
          <Avatar shape='square' :src="item.owner.head_image_url||'/static/default_head.png'"></Avatar>
          <span style="text-align:center;height：60px; line-height:60px">{{item.owner.username}}</span>
          {{moment(item.createdAt).format('LLL')}}
        </div>
        <div class="comment-content">
          {{item.content}}
        </div>
      </div>
    </Card>
    <Form>
      <Card dis-hover style="border:0;">
        <mavon-editor default_open="edit" v-model="comment"  code_style="code-hybrid" :subfield="false" ></mavon-editor>
        <Button type="primary" style="margin-top:15px;" @click="publishComment">评论</Button>
      </Card>
    </Form>
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
