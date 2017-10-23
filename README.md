# Blog

[我的阿里云栖博客](https://yq.aliyun.com/users/1314387063968361)

[本代码搭建的博客](https://www.mumuimp.com)

交流QQ群：428812779
## 文章列表

[基于阿里的Node全栈之路（一）部署Docker](https://www.mumuimp.com/show_topic/59ecb524925e2a0026cb86e8)

[基于阿里的Node全栈之路（二）阿里负载均衡的HTTPS优化方案](https://www.mumuimp.com/show_topic/59ecb518925e2a0026cb86e7)

[基于阿里的Node全栈之路（三）利用阿里云OSS实现前后端分离](https://www.mumuimp.com/show_topic/59ecb50c925e2a0026cb86e6)

[基于阿里的Node全栈之路（四）前后端分离进阶-自动上传前端代码到OSS](https://www.mumuimp.com/show_topic/59ecb4ff925e2a0026cb86e5)

[基于阿里的Node全栈之路（五）前后端分离进阶-接口篇](https://www.mumuimp.com/show_topic/59ecb4f2925e2a0026cb86e4)

[基于阿里的Node全栈之路（六）专有网络VPC的应用](https://www.mumuimp.com/show_topic/59ecb524925e2a0026cb86e8)

## 项目部署
项目分为两部分，前端[www]和后端[api]，同时部署也是分开的。
依赖：

    Node > 7
    Mongodb
    Redis

### api
后端框架是[eggjs](https://github.com/eggjs/egg)，数据库采用mongodb + redis，参数配置可参照下方代码.

```javascript
/**
 * 参数全部从Docker环境变量中获取
 * @argument mongodb_host mongodb的主机地址
 * @argument redis_host redis的主机地址
 * @argument redis_password redis的访问密码
 * @argument redis_db redis的第几号数据库
 */
const mongodb_host = `mongodb://${process.env.mongodb_host || 'localhost'}/blog`;
const redis_host = process.env.redis_host || 'localhost';
const redis_password = process.env.redis_password || '';
const redis_db = process.env.redis_db || 0;
module.exports = {
  logger: {
    dir: './logs',
  },
  security: {
    csrf: false,
  },
  redis: {
    client: {
      port: 6379,
      host: redis_host,
      password: redis_password,
      db: redis_db,
    },
  },
  mongoose: {
    url: mongodb_host,
    options: {},
  },
};
```
参数可以自行修改，配好后，构建环境并启动：
```shell
npm install & npm run debug
# or
yarn install & yarn run debug
```
到这里，后端api就启动成功了，可以直接访问 http://localhost:7001/blog/v1/session ，检查是否启动成功。

### app
后端框架是[vue](https://github.com/vuejs/vue)，采用了[vue-cli](https://github.com/vuejs/vue-cli)，模板采用的是webpack，eslint采用airbnb的.
```javascript
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
/**
 * 参数从Docker环境变量中获取
 * @argument blog_host 后端api地址
 */
const host = process.env.blog_host ? `"${process.env.blog_host}"` : '"https://api.mumuimp.com/blog/v1"';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  host,
});
```
构建环境并启动：
```shell
npm install & npm run dev
# or
yarn install & yarn run dev
```

其实这些参数是可以在系统的环境变量中设置的。
Windows： 参照java环境变量设置，在环境变量中添加blog_host环境变量.（建议在用户变量中添加）
Linux & Mac： 直接在.bashrc或者.bash_profile添加环境变量.

-----------------
![_1_](http://www.mumuimp.com/upload/path.jpg)
------------------
当然！你也可以直接改了它！;)


## 项目发布
#### Docker部署api
具体参照[基于阿里的Node全栈之路（一）部署Docker](https://www.mumuimp.com/show_topic/59ecb524925e2a0026cb86e8)

#### 阿里云OSS部署web
创建index.js，具体代码可以参考index-example.js，并填写好你自己的参数：
```javascript
const store = oss({
  accessKeyId: '< your accessKeyId>',
  accessKeySecret: '< your accessKeySecret>',
  bucket: '< your bucket>',
  region: '< your region>',
});
```
最后，
```shell
yarn run publish
```

友情推荐：

一个好用的[接口管理平台](https://github.com/YMFE/yapi)，支持本地部署，开源MIT，去哪儿前端大神团队开发。

亲情推荐：

[egg-tablestore](https://github.com/mumudev/egg-tablestore)，阿里云的tablestore数据库在egg上的插件，为啥亲情推荐呢？因为是我写的, wo lianpi hou.


## License

[MIT](LICENSE)