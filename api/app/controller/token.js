'use strict';
const BaseController = require('egg').Controller;

class Controller extends BaseController {
  * index() {
    const { ctx, service } = this;
    const token = yield service.token.getToken();
    ctx.done(token);
  }
}
module.exports = Controller;
