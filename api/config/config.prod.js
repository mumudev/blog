"use strict";
/**
 * 参数全部从Docker环境变量中获取
 * @argument mongodb_host mongodb的主机地址
 * @argument redis_host redis的主机地址
 * @argument redis_password redis的访问密码
 * @argument redis_db redis的第几号数据库
 */
const mongodb_host = `mongodb://${process.env.mongodb_host}/blog`;
const redis_host = process.env.redis_host;
const redis_password = process.env.redis_password;
const redis_db = process.env.redis_db || 0;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
module.exports = {
  logger: {
    dir: "./logs"
  },
  redis: {
    client: {
      port: 6379,
      host: redis_host,
      password: redis_password,
      db: redis_db
    }
  },
  sts: {
    client: {
      accessKeyId,
      secretAccessKey
    }
  },
  mongoose: {
    url: mongodb_host,
    options: {}
  }
};
