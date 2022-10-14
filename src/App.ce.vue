<template>


  <Celebration v-if="form.id"></Celebration>
  <template v-else>

    <form class="flex flex-col gap-4" @submit.prevent="handleSubmitAction">


      <Contact v-if="!form.anonymous" :contact.sync="form.contact"></Contact>

      <slot></slot>

      <button type="submit"
        class="rounded bg-blue-800 text-white dark:bg-blue-200 dark:text-black font-semibold hover:bg-blue-700 dark:hover:bg-blue-200 px-4 py-2 md:w-fit">
        {{ strings.submit_button_label }}
      </button>

      {{ form.contact.name }}
    </form>

  </template>

</template>

<script>
import Celebration from "./components/Celebration.vue"
import AccessibilityRequest from "./AccessibilityRequest.js"

import Contact from "./components/Contact.vue";
import Strings from "./Strings.js"

export default {
  data() {
    return {
      form: new AccessibilityRequest(),
      strings: Strings,
    };
  },
  components: {
    Celebration,
    Contact
  },
  methods: {
    handleSubmitAction() {

    }
  }
};
</script>
<style>
@import "./index.css";
</style>
