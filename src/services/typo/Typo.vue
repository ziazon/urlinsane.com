<template lang="pug">
    transition(name="fade" mode="out-in")
      div(v-if="true")
        .notification.is-primary
          .container
            .columns
              .column
                .field
                  p.control
                    input.input(
                      type="text"
                      :value="typoStore.domain"
                      placeholder="Domain"
                      @input="typoStore.updateForm({ domain: $event.target.value })"
                    )
              .column
                .field.is-grouped
                  p.control.is-expanded
                    Multiselect(
                      :options="typoStore.multiSelectOptions"
                      @input="typoStore.updateSelections"
                      :value="typoStore.selections"
                      :multiple="true"
                      group-values="options"
                      group-label="label"
                      :group-select="true"
                      placeholder="Type to search"
                      track-by="value"
                      label="name"
                    )
                  p.control
                    a.button.is-success(@click="fetchResult") Exec
        .is-fullwidth.side-scrollable
          section.section
            //- .control(v-if="error")
              .tags.has-addons
                span.tag.is-danger Error
                span.tag {{ error }}
            table.table(v-if="typoStore.headers")
              thead
                tr
                  th(v-for="header in typoStore.headers") {{ header }}
              tbody
                tr(v-if="typoStore.rows" v-for="row in typoStore.rows")
                  td(v-for="header in typoStore.headers") {{ row[header] }}
      div(v-else) Loading
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators';
import { Component, Vue } from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';
import typoStore from './store';
import wsStore from '@/services/ws/store';

import {
  TypoForm,
  TypoState,
  TypoListItem,
  TypoResponseBody,
  TypoRequestBody,
} from './types';

const components = { Multiselect };

@Component({
  components,
})
export default class Typo extends Vue {
  get typoStore() {
    return getModule(typoStore, this.$store);
  }

  get wsStore() {
    return getModule(wsStore, this.$store);
  }

  private fetchResult() {
    this.wsStore.sendData(this.typoStore.payload);
  }
}
</script>
