<template lang="pug">
.container.landing-container
  .columns.form-box
    FieldBuilder(
      v-for="(option, key) in options"
      :name="key"
      :option="option"
      :key="key"
      @input="onInput"
    )
    .column.is-2.is-paddingless
      a.button.is-primary.is-large.form-button(@click="onSubmit") Exec
</template>

<script lang="ts">
import { assign } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TypoOption } from '@/services/url-insane/types';
import FieldBuilder from './FieldBuilder.vue';

const components = {
  FieldBuilder,
};

@Component({
  components,
})
export default class FormBuilder extends Vue {
  @Prop() private options!: Record<string, TypoOption>;

  private form = {};

  private onInput(value: Record<string, any>) {
    assign(this.form, value);
  }

  private onSubmit() {
    this.$emit('submit', this.form);
  }
}
</script>
