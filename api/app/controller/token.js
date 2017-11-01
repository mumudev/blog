'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.token.create(this.user_id, query);
    ctx.done(models);
  }
}
module.exports = Controller;
