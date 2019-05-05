import UrlInsaneApi from '@/services/url-insane/api';
import { get } from 'lodash';
import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import {
  UrlInsaneState,
  TypoOptionsResponseBody,
  TypoResponseBody,
  TypoRequestBody,
} from '@/services/url-insane/types';

@Module({ namespaced: true })
export default class UrlInsaneModule extends VuexModule implements UrlInsaneState {
  public options = {};
  public result = {};
  public form = {
    domains: [],
    funcs: [],
    keyboards: [],
    typos: [],
  };
  public loading = true;

  get rows() {
    return get(this.result, 'rows', []);
  }

  get headers() {
    return get(this.result, 'headers', []);
  }

  @Action({ commit: 'STORE_OPTIONS' })
  public async fetchOptions() {
    this.context.commit('START_LOADING');
    const options = await UrlInsaneApi.fetchOptions();
    this.context.commit('STOP_LOADING');

    return options;
  }

  @Action({ commit: 'STORE_OPTIONS' })
  public async fetchResult() {
    this.context.commit('START_LOADING');
    const result = await UrlInsaneApi.fetchResult(this.form);
    this.context.commit('STOP_LOADING');

    return result;
  }

  @Mutation private START_LOADING() {
    this.loading = true;
  }

  @Mutation private STOP_LOADING() {
    this.loading = false;
  }

  @Mutation private STORE_OPTIONS(options: TypoOptionsResponseBody) {
    this.options = options;
  }

  @Mutation private STORE_RESULT(result: TypoResponseBody) {
    this.result = result;
  }
}
