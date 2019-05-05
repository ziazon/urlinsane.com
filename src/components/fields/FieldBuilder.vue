<template lang="pug">
  component(:is="component" :name="name" :option="option")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TypoOption } from '@/services/url-insane/types';
import InputField from './InputField.vue';
import MultiSelectField from './MultiSelectField.vue';

const components = {
  'input-field': InputField,
  'multi-select-field': MultiSelectField
};

@Component({
  components
})
export default class FieldBuilder extends Vue {
  @Prop() private name!: string;
  @Prop() private option!: TypoOption;

  get component() {
    return `${this.option.type}-field`
  }
}
</script>