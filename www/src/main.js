// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import Request from '@/plugins/request';
import Moment from '@/plugins/moment';
import VueI18n from 'vue-i18n';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';

import zhLocale from './locale/zh-CN';
import enLocale from './locale/en-US';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(iView);
Vue.use(VueI18n);
Vue.use(Request);
Vue.use(Moment);
Vue.use(mavonEditor);

Vue.config.lang = 'zh-CN';
Vue.locale('zh-CN', zhLocale);
Vue.locale('en-US', enLocale);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
/* eslint-enable no-new */
