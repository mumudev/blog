const BaseController = require('egg').Controller;
class Controller extends BaseController {
  * create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate({ username: { type: 'string' }, password: { type: 'string' } });
    const user = yield service.user.login(ctx.request.body);
    if (!user) {
      return ctx.fail(-1, 'login fail!');
    }
    ctx.session.user = user;
    ctx.done(user);
  }
  index() {
    const { ctx, service } = this;
    if (ctx.session.user) {
      return ctx.done(ctx.session.user);
    }
    return ctx.fail(-1, 'login fail!');
  }
  destroy() {
    const { ctx, service } = this;
    ctx.session.user = null;
    ctx.done();
  }
}
module.exports = Controller;
