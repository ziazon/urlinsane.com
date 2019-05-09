<template lang="pug">
    transition(name="fade" mode="out-in")
      div(v-if="!$store.state.urlInsane.loading")
        FormBuilder(
          :options="$store.state.urlInsane.options"
        )
      div(v-else) Loading
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormBuilder from './fields/FormBuilder.vue';

const components = { FormBuilder };
@Component({
  components,
})
export default class UrlInsane extends Vue {
  private mounted() {
    this.$store.dispatch('urlInsane/fetchOptions');
  }
}
</script>
