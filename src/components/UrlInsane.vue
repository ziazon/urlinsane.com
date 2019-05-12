<template lang="pug">
    transition(name="fade" mode="out-in")
      div(v-if="!$store.state.urlInsane.loading")
        section.section
          FormBuilder(
            :options="options"
            @submit="onSubmit"
            :form="form"
          )
        .is-fullwidth.side-scrollable
          .control(v-if="error")
            .tags.has-addons
              span.tag.is-danger Error
              span.tag {{ error }}
          table(v-if="headers")
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
import FormBuilder from './fields/FormBuilder.vue';
import { TypoOptionsResponseBody, TypoRequestBody } from '@/services/urlinsane/types';

const components = { FormBuilder };
@Component({
  components,
})
export default class UrlInsane extends Vue {
  private mounted() {
    this.$store.dispatch('urlInsane/fetchOptions');
  }

  private onSubmit(form: any) {
    const {
      domain, funcs, keyboards, typos,
    } = form;
    const payload: TypoRequestBody = {
      domains: [form.domain],
      funcs,
      keyboards,
      typos,
    };
    this.$store.dispatch('urlInsane/fetchResult', payload);
  }

  get form() {
    return this.$store.state.urlInsane.form;
  }

  get options() {
    return this.$store.state.urlInsane.options;
  }

  get error() {
    return this.$store.state.urlInsane.error;
  }

  get headers() {
    return this.$store.getters['urlInsane/headers'];
  }

  get rows() {
    return this.$store.getters['urlInsane/rows'];
  }
}
</script>
