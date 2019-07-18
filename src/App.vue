<template lang="pug">
  #app.ant-layout
    SiteHeader
    .ant-layout-content
      router-view
    SiteFooter
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SiteHeader from '@/components/site/Header.vue';
import SiteFooter from '@/components/site/Footer.vue';

const components = { SiteHeader, SiteFooter };

@Component({ components })
export default class App extends Vue {
}
</script>

<style lang="scss">
@import "@/scss/styles.scss";
</style>
