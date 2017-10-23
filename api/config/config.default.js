'use strict';

module.exports = appInfo => {
  const config = {
    // 加载 errorHandler 中间件
    middleware: ['cors', 'error', 'auth'],
    // 对 / 前缀的 url 路径生效
    errorHandler: {
      match: '/',
    },
    logger: {
      dir: './logs',
    },
    session: {
      key: 'EGG_KINDER',
      maxAge: 24 * 3600 * 1000, // 1 天
      httpOnly: true,
      encrypt: true,
    },
    cors: {
      origin(req) {
        return req.headers.origin;
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      headers: 'Content-Type, X-Experience-API-Version, Authorization, X-Requested-With',
      credentials: true,
    },
    security: {
      methodnoallow: {
        enable: false,
      },
    },
    proxyworker: {
      port: 10086
    },
  };
  // should change to your own
  config.keys = appInfo.name + '_15011369_7728';

  // add your config here

  return config;
};

