<template>
  <div class="flex flex-col items-center gap-8">
    Hello
  </div>
</template>

<script>
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"

const language = document.documentElement.lang;

export default {
  data() {
    return {
      language: language,
    };
  },
  computed: {
    logoUrl() {
      return logoUrl
    }
  },
  components: {
  },
  mounted() {

    const pageTitle = this.language === 'fr' ? 'Demandes et commentaires sur l’accessibilité' : 'Accessibility Inquiries and Feedback';
    (new WrapperEventDispatcher(pageTitle, null)).dispatch();

  }
};
</script>
<style>
@import "./index.css";
</style>
