import Vue from 'vue';
import Vuex from 'vuex';
import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import modules from './services/modules';
import { TypoState } from './services/typo/types';
import WS from './services/ws';

const ws = new WS({ protocol: 'ws', host: '127.0.0.1', port: 8888 });

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [ws.plugin()],
});
