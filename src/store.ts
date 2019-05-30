import Vue from 'vue';
import Vuex from 'vuex';
import modules from './services/modules';
import WS from './services/ws/ws';


const ws = new WS({
  protocol: process.env.WEBSOCKET_PROTOCOL,
  host: process.env.WEBSOCKET_HOST,
  port: process.env.WEBSOCKET_PORT,
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [ws.plugin()],
});
