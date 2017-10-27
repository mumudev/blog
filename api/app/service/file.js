"use strict";
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.File;
    }
  }
  return Service;
};
