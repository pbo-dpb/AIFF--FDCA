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


export default {
  data() {
    return {
      form: new AccessibilityRequest(),
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
