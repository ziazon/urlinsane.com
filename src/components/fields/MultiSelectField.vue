<template lang="pug">
  .section.field
    label.label {{ name }}
      span.help.is-danger(v-if="required") Required
      p.help {{ description }}
    .control
      .field(v-for="checkbox in option.values")
        input.switch(
          :id="checkbox.name"
          type="checkbox"
          :name="checkbox.name"
          :value="checkbox.value"
        )
        label(:for="checkbox.name") {{ checkbox.description }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TypoOption } from '@/services/url-insane/types';

@Component
export default class MultiSelectField extends Vue {
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
