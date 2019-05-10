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

  public error = '';

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
    let options = {};

    this.context.commit('START_LOADING');

    try {
      options = await UrlInsaneApi.fetchOptions();
    } catch (error) {
      this.context.commit('SET_ERROR', error.message);
    }

    this.context.commit('STOP_LOADING');
    this.context.commit('RESET_ERROR');

    return options;
  }

  @Action({ commit: 'STORE_RESULT' })
  public async fetchResult(payload: TypoRequestBody) {
    let result = {};

    this.context.commit('START_LOADING');

    try {
      result = await UrlInsaneApi.fetchResult(payload);
    } catch (error) {
      this.context.commit('SET_ERROR', error.message);
    }

    this.context.commit('STOP_LOADING');
    this.context.commit('RESET_ERROR');

    return result;
  }

  @Mutation private START_LOADING() {
    this.loading = true;
  }

  @Mutation private STOP_LOADING() {
    this.loading = false;
  }

  @Mutation private SET_ERROR(error: string) {
    this.error = error;
  }

  @Mutation private RESET_ERROR() {
    this.error = '';
  }

  @Mutation private STORE_OPTIONS(options: TypoOptionsResponseBody) {
    this.options = options;
  }

  @Mutation private STORE_RESULT(result: TypoResponseBody) {
    this.result = result;
  }
}
