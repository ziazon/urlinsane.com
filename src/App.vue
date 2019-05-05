<template lang="pug">
  #app
    nav.navbar(role="navigation" aria-label="main navigation")
      .navbar-brand
        router-link.navbar-item(to="/") Cyber Security Tools
        a.navbar-burger.burger(role="button" aria-label="menu" aria-expanded="false" data-target="navbarSiteNav" :class="{'is-active': menuIsOpen}" @click="menuIsOpen = !menuIsOpen")
          span(aria-hidden="true" v-for="i in 3")
      #navbarSiteNav.navbar-menu(:class="{'is-active': menuIsOpen}")
        .navbar-start
          router-link.navbar-item(to="/") Home
          router-link.navbar-item(to="/url-insane") Url Insane
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private menuIsOpen: boolean = false;
}
</script>

<style lang="scss">
@import "@/scss/styles.scss";
</style>