<template lang="pug">
  #app
    nav.navbar(role="navigation" aria-label="main navigation")
      .navbar-brand
        router-link.navbar-item(to="/") cybersectech.io
        a.navbar-burger.burger(
          role="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarSiteNav"
          :class="{'is-active': menuIsOpen}"
          @click="menuIsOpen = !menuIsOpen"
        )
          span(aria-hidden="true" v-for="i in 3")
      #navbarSiteNav.navbar-menu(:class="{'is-active': menuIsOpen}")
        .navbar-start
          router-link.navbar-item(to="/") Home
          router-link.navbar-item(to="/urlinsane") Url Insane
    section.section.is-fullheight.is-paddingless
      router-view
    footer.footer
      .content.has-text-centered
        p
          strong cybersectech.io
          | &nbsp;by&nbsp;
          a(href="https://github.com/orgs/secint/people") SecInt
          | . The source code is licensed&nbsp;
          a(href="http://opensource.org/licenses/mit-license.php") MIT
          | . The website content is licensed&nbsp;
          a(href="http://creativecommons.org/licenses/by-nc-sa/4.0/") CC BY NC SA 4.0
          | .
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

.is-fullheight {
  min-height: calc(100vh - #{$navbar-height} - #{$footer-height});
}
</style>
