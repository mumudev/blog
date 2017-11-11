'use strict';
const WechatBot = require('wechat4u');
const bot_list = [];
module.exports = app => {
  class Service extends app.BaseService {
    get model() {
      return this.ctx.model.User;
    }
    buildWechatBot(session) {
      const user_id = session._id.toString();
      const bot_data = session.bot_data;
      return new Promise((resolve, reject) => {
        let bot;
        const data = { isLogin: false };
        if (bot_list[user_id]) {
          data.isLogin = bot_list[user_id].state == bot_list[user_id].CONF.STATE.login;
          data.uuid = bot_list[user_id].uuid;
          resolve(data);
          return;
        }
        try {
          if (!bot_data) {
            throw new Error();
          }
          bot = new WechatBot(bot_data);
        } catch (e) {
          bot = new WechatBot();
          bot.on('uuid', uuid => {
            bot.uuid = `https://login.weixin.qq.com/l/${uuid}`;
            data.uuid = `https://login.weixin.qq.com/l/${uuid}`;
            resolve(data);
          });
        }
        bot.PROP.uin ? bot.restart() : bot.start();
        bot.on('login', async () => {
          data.isLogin = true;
          resolve(data);
        });
        bot.on('error', err => {
          console.error('错误：', err);
        });
        bot_list[user_id] = bot;
      });
    }
    buildAutoReply(userId, messages) {
      userId = userId.toString();
      const bot = bot_list[userId];
      bot.on('message', async msg => {
        switch (msg.MsgType) {
          case bot.CONF.MSGTYPE_TEXT:
            for (let index = 0; index < messages.length; index++) {
              const item = messages[index];
              if (msg.Content.indexOf(item.key) !== -1) {
                bot.sendMsg(item.message, msg.FromUserName)
                  .catch(err => {
                    console.error(err);
                  });
                break;
              }
            }
            break;
          case bot.CONF.MSGTYPE_SYS:
            if (/红包/.test(msg.Content)) {
              const ToUserName = 'filehelper';
              bot.sendMsg('你收到个红包！\n' + new Date(), ToUserName).catch(err => {
                bot.emit('error', err);
              });
            }
            break;
          default:
            break;
        }
      });
    }
  }
  return Service;
};
