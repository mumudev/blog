"use strict";

module.exports = app => {
  class Service extends app.Service {
    async create(user_id, query) {
      console.log(app.sts.assumeRole);
      const token = await app.sts.assumeRole({
        Action: "AssumeRole",
        // 指定角色Arn
        RoleArn: "acs:ram::1314387063968361:root",
        //设置Token的附加Policy，可以在获取Token时，通过额外设置一个Policy进一步减小Token的权限；
        //Policy: '{"Version":"1","Statement":[{"Effect":"Allow", "Action":"*", "Resource":"*"}]}',
        //设置Token有效期，可选参数，默认3600秒；
        //DurationSeconds: 3600,
        RoleSessionName: user_id
      });
    }
  }
  return Service;
};
