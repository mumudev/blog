'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    if (!ctx.userId) {
      ctx.fail(-1);
      return;
    }
    const model = yield service.wechatBot.buildWechatBot(ctx.session.user);
    ctx.done(model);
  }
  * show() {
  }
  * create() {
    const { ctx, service } = this;
    const { messages } = ctx.request.body;
    service.wechatBot.buildAutoReply(ctx.userId, messages);
    ctx.done();
  }
  * update() {
  }
  * destroy() {
  }
}
module.exports = Controller;
