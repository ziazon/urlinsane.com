<template lang="pug">
  div
    transition(name="fade" mode="out-in")
      div(v-if="!$store.state.urlInsane.loading")
        FieldBuilder(v-for="(option, key) in $store.state.urlInsane.options" :name="key" :option="option")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FieldBuilder from './fields/FieldBuilder.vue';

const components = { FieldBuilder }
@Component({
  components
})
export default class UrlInsane extends Vue {
  private mounted() {
    this.$store.dispatch('urlInsane/fetchOptions');
  }
}
</script>