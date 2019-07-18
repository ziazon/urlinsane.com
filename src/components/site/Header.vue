<template lang="pug">
  .header.ant-layout-header
    .logo
    .ant-row
      .ant-col-8
        ul.ant-menu.ant-menu-horizontal.ant-menu-root.ant-menu-dark(role="menu")
          li.ant-menu-item
            router-link.navbar-item(to="/") Home
          li.ant-menu-item
            router-link.navbar-item(to="/typo") Typo Squatting
      .ant-col-8.ant-col-offset-8
        ul.ant-menu.ant-menu-horizontal.ant-menu-root.ant-menu-dark(role="menu")
          li.ant-menu-item
            a.navbar-item(href="//github.com/cybersectech-org/urlinsane/stargazers")
              img(src="https://img.shields.io/github/stars/cybersectech-org/urlinsane.svg" alt="GitHub stars")
          li.ant-menu-item
            a.navbar-item(href="//github.com/cybersectech-org/urlinsane/issues" target="_blank")
              i.fa.fa-bug
              | &nbsp;Report an issue
          li.ant-menu-item
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
