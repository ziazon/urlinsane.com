<template lang="pug">
  .section.field
    label.label {{ name }}
      p.help {{ description }}
      span.help.is-danger(v-if="required") Required
    .control
      input.input(type="text" placeholder="domain")
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