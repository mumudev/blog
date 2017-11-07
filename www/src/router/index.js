import Vue from 'vue';
import Router from 'vue-router';

import TopicAdd from '@/views/Topic/Add';
import TopicEdit from '@/views/Topic/Edit';
import TopicShow from '@/views/Topic/Show';

import Main from '@/views/Main';
import Info from '@/views/Info';
import Setting from '@/views/Setting';
import Login from '@/views/Login';
import Register from '@/views/Register';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Main },
    { path: '/main', component: Main },
    { path: '/add_topic', component: TopicAdd },
    { path: '/show_topic/:id', component: TopicShow },
    { path: '/edit_topic/:id', component: TopicEdit },
    { path: '/Info', component: Info },
    { path: '/Setting', component: Setting },
    { path: '/Login', component: Login },
    { path: '/Register', component: Register },
  ],
});
