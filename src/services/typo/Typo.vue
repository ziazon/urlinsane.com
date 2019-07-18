<template lang="pug">
  #typo-squatting-search
    a-form(layout="inline" @submit="")
      a-row
        a-col(:span="6" :validate-status="'error'")
          .search-form-item
            a-input(
              size="large"
              v-decorator="[]"
              placeholder="Domain"
              :value="typoStore.domain"
              @input="typoStore.updateForm({ domain: $event.target.value })"
            )
        a-col(:span="12")
          .search-form-item
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
        a-col(:span="6")
          .search-form-item
            a-button(
              size="large"
              type="primary"
              @click="fetchResult"
            ) Exec
    transition(name="fade" mode="out-in")
      .ant-table.ant-table-scroll-position-left.ant-table-default.ant-table-bordered(v-if="true")
        .ant-table-title
        .ant-table-content
          .ant-table-body
            thead.ant-table-thead
              tr
                th(v-for="header in typoStore.headers") {{ header }}
            tbody.ant-table-tbody
              tr.ant-table-row.ant-table-row-level-0(
                v-if="typoStore.rows"
                v-for="row in typoStore.rows"
              )
                td(v-for="header in typoStore.headers") {{ row[header] }}
          .ant-table-footer
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

<style lang="scss" scoped>
  .search-form-item {
    margin: 10px;
  }
</style>
