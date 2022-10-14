<template>


  <Celebration v-if="form.id"></Celebration>
  <template v-else>




    <slot></slot>



  </template>

</template>

<script>
const language = document.documentElement.lang;
import Celebration from "./components/Celebration.vue"
import AccessibilityRequest from "./AccessibilityRequest.js"

import stringsEn from './strings.en.json?raw'
import stringsFr from './strings.fr.json?raw'
const strings = {
  en: stringsEn,
  fr: stringsFr
}

export default {
  data() {
    return {
      form: new AccessibilityRequest(),
      strings: strings[language]
    };
  },
  components: {
    Celebration,

  },
  mounted() {

  }
};
</script>
<style>
@import "./index.css";
</style>
