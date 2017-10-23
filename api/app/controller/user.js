'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    const models = yield service.user.getAll(query);
    ctx.done(models);
  }
  * show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const model = yield service.user.getById(id, { username: 1, head_image_url: 1 });
    ctx.done(model);
  }
  * create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const model = yield service.user.create(body);
    ctx.done(model);
  }
  * update() {
    const { ctx, service } = this;
    const id = ctx.user_id;
    const body = ctx.request.body;
    const { old_password } = body;
    let model = yield service.user.getById(id);
    if (model.password !== old_password) {
      return ctx.fail(0, 'password not correct!');
    }
    model = yield service.user.updateById(id, body);
    ctx.done();
  }
}
module.exports = Controller;
