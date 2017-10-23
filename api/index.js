'use strict';

// npm run dev DO NOT read this file

require('egg').startCluster({
  baseDir: __dirname,
  port: process.env.port || 7001, // default to 7001
});
