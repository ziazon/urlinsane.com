<template lang="pug">
  footer.footer
    .content.has-text-centered
      p
        strong urlinsane.com
        | &nbsp;by&nbsp;
        a(href="https://github.com/orgs/cybersectech-org/people") CyberSecTech
        | . The source code is licensed&nbsp;
        a(href="https://opensource.org/licenses/ISC") ISC
        | . The website content is licensed&nbsp;
        a(href="http://creativecommons.org/licenses/by-nc-sa/4.0/") CC BY NC SA 4.0
        | .
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
}
</script>
