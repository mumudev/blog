'use strict';
const WechatBot = require('wechat4u');
const bot_list = [];
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.User;
    }
    async login({ username, password }) {
      const model = await this.model.findOne(
        { username, password },
        { username: 1, head_image_url: 1, motto: 1, status: 1, phone: 1 }
      );
      model.wechat_bot = await this.buildWechatBot(model._id.toString(), model.bot_data);
      return model;
    }
    buildWechatBot(user_id, bot_data) {
      return new Promise((resolve, reject) => {
        let bot;
        const data = { isLogin: false };
        try {
          if (!bot_data) {
            throw new Error();
          }
          bot = new WechatBot(bot_data);
        } catch (e) {
          bot = new WechatBot();
          bot.on('uuid', uuid => {
            data.uuid = `https://login.weixin.qq.com/l/${uuid}`;
            resolve(data);
          });
        }
        bot.PROP.uin ? bot.restart() : bot.start();
        bot.on('login', async () => {
          data.isLogin = true;
          resolve(data);
        });
        bot_list[user_id] = bot;
      });
    }

  }
  return Service;
};
