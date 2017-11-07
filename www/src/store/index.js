import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  state: {
    session: {},
    locale: 'zh-CN',
  },
  mutations: {
    setLocale(state, e) {
      Vue.config.lang = e;
      state.locale = e;
    },
    setSession(state, e) {
      state.session = e || {};
    },
    setTopic(state, e) {
      state.topic = e;
    },
  },
  getters: {
    locale(state) {
      return state.locale;
    },
    session(state) {
      return state.session;
    },
    topic(state) {
      return state.topic;
    },
  },
  strict: debug,
});
