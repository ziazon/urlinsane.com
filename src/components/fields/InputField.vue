<template lang="pug">
  .column.is-2.is-paddingless
    form.form-block
      input.form-input.home-input(type="text" placeholder="domain")
    p.help
      span {{ description }}
        .is-inline.help.is-danger(v-if="required") * Required
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TypoOption } from '@/services/url-insane/types';

@Component
export default class InputField extends Vue {
  @Prop() private name!: string;

  @Prop() private option!: TypoOption;

  get required() {
    return !this.option.optional;
  }

  get description() {
    return this.option.description;
  }
}
</script>
