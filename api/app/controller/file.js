'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.file.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.file.getById(id);
    ctx.done(model);
  }
  * create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!ctx.user_id) {
      return ctx.fail(0);
    }
    body.owner = ctx.user_id;
    const model = yield service.file.create(body);
    ctx.done(model);
  }
  * destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.file.getById(id);
    if (model.owner._id.toString() !== ctx.user_id) {
      return ctx.fail(0);
    }
    yield service.file.deleteById(id);
    ctx.done();
  }
}
module.exports = Controller;
