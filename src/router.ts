import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './components/Home.vue'),
    },
    {
      path: '/typo',
      name: 'typo',
      component: () => import(/* webpackChunkName: "about" */ './services/typo/Typo.vue'),
    },
  ],
});
