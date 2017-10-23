'use strict';
const ServiceExtend = require('../extend/service');
module.exports = app => {
  const ServiceBase = ServiceExtend(app);
  class Service extends ServiceBase {
    constructor(...args) {
      super(...args);
      this.setModel('User');
    }
    async getAll(query = {}) {
      const { offset = 0, page = 0, limit = 10 } = query;
      delete query.page;
      delete query.limit;
      delete query.offset;
      const models = await this.model.paginate(query, {
        select: { username: 1, head_image_url: 1 },
        page,
        limit,
      });
      return models;
    }
    async login({ username, password }) {
      const model = await this.model.findOne({ username, password },
        { username: 1, head_image_url: 1, motto: 1, status: 1, phone: 1 });
      return model;
    }
  }
  return Service;
};
