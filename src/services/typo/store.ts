import {
  chain, get, map, pick,
} from 'lodash';
import TypoApi from '@/services/typo/api';
import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import {
  TypoState,
  TypoOption,
  TypoOptionsResponseBody,
  TypoListItem,
  TypoRequestBody,
  TypoResponseBody,
  TypoForm,
} from '@/services/typo/types';

@Module({ namespaced: true })
export default class UrlInsaneModule extends VuexModule implements TypoState {
  public options = {};

  public rows: TypoResponseBody['rows'] = [];

  public headers: TypoResponseBody['headers'] = [];

  public form: TypoForm = {
    domain: '',
    selections: [],
  };

  get domain() {
    return this.form.domain;
  }

  get selections() {
    return this.form.selections;
  }

  get payload() {
    const selections = chain(this.form.selections)
      .groupBy('category')
      .mapValues(values => map(values, 'value'))
      .value();
    return {
      domains: [this.domain],
      ...selections,
    };
  }

  get multiSelectOptions() {
    const options = chain(this.options)
      .pickBy('values')
      .map((row: TypoOption, category: string) => ({
        category,
        options: map(get(row, 'values', []), value => ({ ...value, category })),
      })).value();
    return options;
  }

  @Action({ commit: 'storeOptions' })
  public async fetchOptions() {
    const options = await TypoApi.fetchOptions();
    return options;
  }

  @Action({ commit: 'storeResult' })
  public async fetchResult() {
    // TODO: fix this dynamic type.  should never do 'value as TheInterface'
    const result = await TypoApi.fetchResult(this.payload as TypoRequestBody);
    return result;
  }

  @Mutation private storeOptions(options: TypoOptionsResponseBody) {
    this.options = options;
  }

  @Mutation private storeResult({ rows = [], headers = [] }: TypoResponseBody) {
    this.rows = rows;
    this.headers = headers;
  }

  @Mutation private updateSelections(payload: TypoListItem[]) {
    this.form.selections = payload;
  }

  @Mutation private updateForm(payload: TypoForm) {
    this.form = {
      ...this.form, ...payload,
    };
  }
}
