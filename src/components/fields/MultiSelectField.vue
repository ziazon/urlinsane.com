<template lang="pug">
  .column.is-2.is-paddingless
    .multi-select-block
      a(:title="description" class="button" @click="toggle")
        span {{ name }}
      .dropdown-container(:class="{'is-open': expanded}")
        .dropdown
          .options-container
            .field(v-for="checkbox in option.values")
              p.control
                .b-checkbox.is-primary
                  input.styled(
                    :id="checkbox.value"
                    type="checkbox"
                    :name="checkbox.value"
                    :value="checkbox.value"
                    @change="onChange(selections)"
                    :checked="isChecked(checkbox.value)"
                    v-model="selections"
                  )
                  label(:for="checkbox.value") {{ checkbox.description }}
    p.help
      span {{ description }}
        .is-inline.help.is-danger(v-if="required") * Required
</template>

<script lang="ts">
import { includes } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TypoOption } from '@/services/url-insane/types';

@Component
export default class MultiSelectField extends Vue {
  @Prop() private name!: string;

  @Prop() private option!: TypoOption;

  @Prop() private value!: string[];

  private selections: string[] = [];

  private expanded: boolean = false;

  private toggle() {
    this.expanded = !this.expanded;
  }

  get required() {
    return !this.option.optional;
  }

  get description() {
    return this.option.description;
  }

  private isChecked(value: string) {
    return includes(this.value, value);
  }

  private onChange(value: string) {
    this.$emit('input', value);
  }
}
</script>
