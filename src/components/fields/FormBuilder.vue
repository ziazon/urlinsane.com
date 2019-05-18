<template lang="pug">
.container.landing-container
  .columns.form-box
    | {{options}}
    //- FieldBuilder(
    //-   v-for="(option, key) in options"
    //-   :name="key"
    //-   :value="form[key]"
    //-   :option="option"
    //-   :key="key"
    //-   @input="updateForm"
    //- )
    .column.is-2.is-paddingless
      a.button.is-primary.is-large.form-button(@click="onSubmit") Exec
</template>

<script lang="ts">
import { assign } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import FieldBuilder from './FieldBuilder.vue';

const components = {
  FieldBuilder,
};

@Component({
  components,
})
export default class FormBuilder extends Vue {
  @Prop() private options!: Record<string, any>;

  @Prop() private form!: Record<string, any>;

  @Prop() private updateForm!: (payload: any) => void;

  private onSubmit() {
    this.$emit('submit');
  }
}
</script>
