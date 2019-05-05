import Vue from 'vue';
import Vuex from 'vuex';
import modules from './services/modules';
import { UrlInsaneState } from './services/url-insane/types';

Vue.use(Vuex);

export interface RootState {
  urlInsane: UrlInsaneState;
}

export default new Vuex.Store<RootState>({
  modules,
});
