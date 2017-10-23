'use strict';
const ServiceExtend = require('../extend/service');
module.exports = app => {
  const ServiceBase = ServiceExtend(app);
  class Service extends ServiceBase {
    constructor(...args) {
      super(...args);
      this.setModel('Comment');
    }
    async create(body) {
      const model = await this.model.create(body);
      const topic = await this.ctx.service.topic.updateById(model.topic_id, { $inc: { comment_count: 1 } });
      return model;
    }
  }
  return Service;
};
