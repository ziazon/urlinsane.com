<template lang="pug">
    transition(name="fade" mode="out-in")
      div(v-if="!$store.state.typo.loading")
        section.section
          .columns
            .column
              .field
                label.label Domain
                p.control
                  input.input(
                    type="text"
                    :value="domain"
                    @input="updateForm({ domain: $event.target.value })"
                  )
            .column
              .field
                label.label Options
                p.control
                  Multiselect(
                    :options="multiSelectOptions"
                    @input="updateSelections"
                    :value="selections"
                    :multiple="true"
                    group-values="options"
                    group-label="category"
                    :group-select="true"
                    placeholder="Type to search"
                    track-by="value"
                    label="name"
                  )
            .column.is-2.is-paddingless
              a.button.is-primary.is-large.form-button(@click="fetchResult") Exec
        .is-fullwidth.side-scrollable
          section.section
            //- .control(v-if="error")
              .tags.has-addons
                span.tag.is-danger Error
                span.tag {{ error }}
            table.table(v-if="headers")
              thead
                tr
                  th(v-for="header in headers") {{ header }}
              tbody
                tr(v-if="rows" v-for="row in rows")
                  td(v-for="header in headers") {{ row[header] }}
      div(v-else) Loading
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Multiselect from 'vue-multiselect';
import {
  TypoForm,
  TypoState,
  TypoOptionsResponseBody,
  TypoListItem,
  TypoRequestBody,
  TypoResponseBody,
} from './types';

const typoStore = namespace('typo');
const components = { Multiselect };

@Component({
  components,
})
export default class Typo extends Vue {
  @typoStore.Getter private multiSelectOptions!: any;

  @typoStore.Getter private selections!: TypoListItem[];

  @typoStore.Getter private domain!: string;

  @typoStore.State((state: TypoState) => state.headers) private headers!: TypoResponseBody['headers'];

  @typoStore.State((state: TypoState) => state.rows) private rows!: TypoResponseBody['rows'];

  @typoStore.Action private fetchOptions!: () => Promise<void>;

  @typoStore.Action private fetchResult!: (payload: TypoRequestBody) => Promise<void>;

  @typoStore.Mutation private updateForm!: (payload: TypoForm) => void;

  @typoStore.Mutation private updateSelections!: (payload: TypoListItem[]) => void;

  private mounted() {
    this.fetchOptions();
  }
}
</script>
