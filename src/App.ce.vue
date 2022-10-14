<template>


  <Celebration v-if="form.id"></Celebration>
  <template v-else>

    <form class="flex flex-col gap-8" @submit.prevent="handleSubmitAction">

      <RequestTypeSelector v-model="form.requestType"></RequestTypeSelector>


      <MainTextbox v-if="form.requestType" :form.sync="form"></MainTextbox>

      <AnonymitySelector v-if="form.requestType && form.canRequestAnonymity" v-model="form.anonymous">
      </AnonymitySelector>

      <Contact v-if="form.requestType && !form.anonymous" :contact.sync="form.contact"></Contact>

      <div v-show="form.requestType">
        <slot></slot>
      </div>

      <button v-if="form.requestType" type="submit"
        class="rounded bg-blue-800 text-white dark:bg-blue-200 dark:text-black font-semibold hover:bg-blue-700 dark:hover:bg-blue-200 px-4 py-2 md:w-fit">
        {{ strings.submit_button_label }}
      </button>


      {{ form.serialize() }}

    </form>

  </template>

</template>

<script>
import Celebration from "./components/Celebration.vue"
import AccessibilityRequest from "./AccessibilityRequest.js"
import RequestTypeSelector from "./components/RequestTypeSelector.js"
import MainTextbox from "./components/MainTextbox.vue"
import AnonymitySelector from "./components/AnonymitySelector.js"

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
    RequestTypeSelector,
    Celebration,
    Contact,
    MainTextbox,
    AnonymitySelector
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
