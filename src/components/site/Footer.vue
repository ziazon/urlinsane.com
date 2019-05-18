<template lang="pug">
  footer.footer
    .content.has-text-centered
      p
        strong urlinsane.com
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
export default class Footer extends Vue {
}
</script>
