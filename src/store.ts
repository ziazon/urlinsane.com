import Vue from 'vue';
import Vuex from 'vuex';
import modules from './services/modules';
import { TypoState } from './services/typo/types';

Vue.use(Vuex);

export interface RootState {
  typo: TypoState;
}

export default new Vuex.Store<RootState>({
  modules,
});
