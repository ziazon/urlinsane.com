import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';

sync(store, router);

Vue.use(VueAnalytics, {
  id: 'UA-140431310-1',
  router,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
