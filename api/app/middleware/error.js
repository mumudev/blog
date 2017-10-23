'use strict';

module.exports = (options, app) => {
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
      // 框架会统一监听，并打印对应的错误日志
      app.emit('error', err, ctx);
      // 自定义错误时异常返回的格式
      let { code = -2, msg = 'server error!' } = err;
      if (code > 0) {
        code = -2;
      }
      ctx.fail(code, msg);
    }
  };
};
