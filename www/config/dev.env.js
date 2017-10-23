const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

const host = process.env.blog_host ? `"${process.env.blog_host}"` : '"https://api.mumuimp.com/blog/v1"';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  host,
});
