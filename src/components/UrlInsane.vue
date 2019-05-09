<template lang="pug">
    transition(name="fade" mode="out-in")
      div(v-if="!$store.state.urlInsane.loading")
        FormBuilder(
          :options="options"
          @submit="onSubmit"
        )
        | {{ headers }}
        | {{ rows }}
      div(v-else) Loading
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormBuilder from './fields/FormBuilder.vue';
import { TypoOptionsResponseBody, TypoRequestBody } from '@/services/url-insane/types';

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

  get options() {
    return this.$store.state.urlInsane.options;
  }

  get headers() {
    return this.$store.state.urlInsane.headers;
  }

  get rows() {
    return this.$store.state.urlInsane.rows;
  }
}
</script>
