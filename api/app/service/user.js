'use strict';
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.User;
    }
    async login({ username, password }) {
      const model = await this.model.findOne(
        { username, password },
        { username: 1, head_image_url: 1, motto: 1, status: 1, phone: 1 }
      );
      return model;
    }
  }
  return Service;
};
