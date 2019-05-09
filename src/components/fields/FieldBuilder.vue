<template lang="pug">
  component(
    :is="component"
    :name="name"
    :option="option"
    @input="onInput($event, name)"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TypoOption } from '@/services/url-insane/types';
import InputField from './InputField.vue';
import MultiSelectField from './MultiSelectField.vue';

const components = {
  'input-field': InputField,
  'multi-select-field': MultiSelectField,
};

@Component({
  components,
})
export default class FieldBuilder extends Vue {
  @Prop() private name!: string;

  @Prop() private option!: TypoOption;

  private onInput(value: any, name: string) {
    this.$emit('input', { [name]: value });
  }

  get component() {
    return `${this.option.type}-field`;
  }
}
</script>
