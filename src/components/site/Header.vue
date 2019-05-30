<template lang="pug">
  section.hero.is-primary
    .hero-head
      nav.main-nav.navbar
        .container
          .navbar-start
            router-link.navbar-item(to="/")
                h1.title.is-5 UrlInsane
            router-link.navbar-item(to="/") Home
            .navbar-item.has-dropdown.is-hoverable
              a.navbar-link
                | Tools
              .navbar-dropdown.is-boxed
                .columns
                  .column
                    router-link.navbar-item(to="/typo") Typo Squatting
          span.navbar-toggle
            span
            span
            span
          .navbar-end.navbar-menu
            a.navbar-item(href="//github.com/cybersectech-org/urlinsane/stargazers")
              img(src="https://img.shields.io/github/stars/cybersectech-org/urlinsane.svg" alt="GitHub stars")
            a.navbar-item(href="//github.com/cybersectech-org/urlinsane/issues" target="_blank")
              i.fa.fa-bug
              | &nbsp;Report an issue
            a.navbar-item(href="//github.com/cybersectech-org/urlinsane" target="_blank")
              span.icon
                i.fa.fa-github
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>
