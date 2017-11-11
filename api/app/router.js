'use strict';

module.exports = app => {
  app.delete('blog_api.session', '/blog/v1/session', 'session.destroy');
  app.resources('blog_api.session', '/blog/v1/session', 'session');
  app.resources('blog_api.token', '/blog/v1/token', 'token');
  app.resources('blog_api.wechatBot', '/blog/v1/wechatBot', 'wechatBot');
  app.resources('blog_api.topic', '/blog/v1/topic', 'topic');
  app.put('blog_api.user', '/blog/v1/user', 'user.update');
  app.resources('blog_api.user', '/blog/v1/user', 'user');
  app.resources('blog_api.comment', '/blog/v1/comment', 'comment');
};
