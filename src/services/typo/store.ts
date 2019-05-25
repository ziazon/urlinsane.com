import {
  chain, get, map, first, keys,
} from 'lodash';
import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import {
  TypoState,
  TypoListItem,
  TypoConfigItem,
  TypoResponseBody,
  TypoForm,
} from './types';
import conf from './config';

@Module({ namespaced: true })
export default class UrlInsaneModule extends VuexModule implements TypoState {
  public config = conf();

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

  get options() {
    return get(this.config, 'options');
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
    const config = chain(this.options)
      .map((row: TypoConfigItem, category: string) => ({
        category,
        label: row.label,
        description: row.description,
        options: map(get(row, 'values', []), value => ({ ...value, category })),
      })).value();
    return config;
  }

  get rows() {
    return map(this.context.rootState.received, row => row.data);
  }

  get headers() {
    return keys(first(this.rows));
  }

  @Action
  private fetchResult() {
    this.context.dispatch('sendData', this.payload, { root: true });
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
