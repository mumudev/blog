'use strict';

const check = ctx => {
  return true;
};
module.exports = (options, app) => {
  return async function(ctx, next) {
    if (check(ctx)) {
      return await next();
    }
    return ctx.fail(0);
  };
};
