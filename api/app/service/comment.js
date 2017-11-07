'use strict';
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.Comment;
    }
    async create(body) {
      const model = await this.model.create(body);
      const topic = await this.ctx.service.topic.updateById(model.topic_id, {
        $inc: { comment_count: 1 },
      });
      return model;
    }
    async deleteById(id) {
      const model = await this.model.findByIdAndRemove(id);
      const topic = await this.ctx.service.topic.updateById(model.topic_id, {
        $inc: { comment_count: -1 },
      });
      return model;
    }
  }
  return Service;
};
