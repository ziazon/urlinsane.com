<template lang="pug">
  .tile.is-ancestor
    transition(name="fade" mode="out-in")
      .tile.is-parent(v-if="!$store.state.urlInsane.loading")
        FieldBuilder.tile.is-child(
          v-for="(option, key) in $store.state.urlInsane.options"
          :name="key"
          :option="option"
        )
      .tile.is-vertical.is-16(v-else) Loading
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FieldBuilder from './fields/FieldBuilder.vue';

const components = { FieldBuilder };
@Component({
  components,
})
export default class UrlInsane extends Vue {
  private mounted() {
    this.$store.dispatch('urlInsane/fetchOptions');
  }
}
</script>
