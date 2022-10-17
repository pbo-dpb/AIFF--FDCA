<template>


  <Celebration v-if="form.id"></Celebration>
  <template v-else>

    <form class="flex flex-col gap-16" @submit.prevent="handleSubmitAction">

      <RequestTypeSelector v-model="form.requestType"></RequestTypeSelector>


      <MainTextbox v-if="form.requestType" :form.sync="form"></MainTextbox>

      <AnonymitySelector v-if="form.requestType && form.canRequestAnonymity" v-model="form.anonymous">
      </AnonymitySelector>

      <ContactForm v-if="form.requestType && !form.anonymous" :contact.sync="form.contact"></ContactForm>

      <div v-show="form.requestType">
        <slot></slot>
      </div>

      <button v-if="form.requestType" type="submit"
        class="rounded bg-purple-800 text-white dark:bg-purple-200 dark:text-black font-semibold hover:bg-purple-700 dark:hover:bg-purple-200 px-4 py-2 md:w-fit">
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

import ContactForm from "./components/ContactForm.vue";
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
    ContactForm,
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
