var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';

const loaders = utils.cssLoaders({
  sourceMap: isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap,
  extract: isProduction
});
loaders.less =
[
  'vue-style-loader',
  'css-loader',
  {
    loader: 'less-loader',
  }
];

const transformToRequire = {
  video: 'src',
  source: 'src',
  img: 'src',
  image: 'xlink:href'
}
module.exports = { loaders, transformToRequire };
