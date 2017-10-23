'use strict';
module.exports = app => {
  return {
    schedule: {
      interval: '1m', // 本地开发环境不执行
      type: 'all',
      immediate: true,
    },
    async task(ctx) {
    },
  };
};
