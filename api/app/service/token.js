'use strict';
const aliOss = require('ali-oss');
const STS = aliOss.STS;
const sts = new STS({
  accessKeyId: 'LTAI5wt0LA3bPnzT',
  accessKeySecret: 'ZGENuk7GDuc3jwsuaglRfrT5pye6qf',
});
const policy = {
  Statement: [
    {
      Action: [
        'oss:GetObject',
        'oss:PutObject',
      ],
      Effect: 'Allow',
      Resource: [
        'acs:oss:*:*:mumuimp-carpool',
        'acs:oss:*:*:mumuimp-carpool/*',
      ],
    },
  ],
  Version: '1',
};
module.exports = app => {
  class Service extends app.Service {
    * getToken() {
      const token = yield sts.assumeRole(
        'acs:ram::1314387063968361:role/mumuimp-upload', policy, 15 * 60, 'carpool');
      return token.credentials;
    }
  }
  return Service;
};
