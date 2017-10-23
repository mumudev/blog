/* eslint-disable */
import moment from 'moment';

moment.locale('zh-cn');
const MyPlugin = {};

MyPlugin.install = function install(Vue) {
  Vue.prototype.moment = moment;
};
export default MyPlugin;
/* eslint-enable */
