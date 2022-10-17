<template>
  <section aria-live="polite">

    <Celebration v-if="state.shouldDisplayCelebration" :form="form"></Celebration>
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

        <div v-if="form.requestType" class="flex flex-row items-center gap-2">
          <button type="submit" class="
        rounded
         bg-purple-800
         text-white 
         disabled:opacity-70
          enabled:hover:bg-purple-700 
          enabled:dark:hover:bg-purple-200 
          px-4 
          py-2 
          md:w-fit
          " :disabled="state.submittingForm" :aria-busy="state.submittingForm">
            {{ strings.submit_button_label }}
          </button>
          <LoadingIndicator v-if="state.submittingForm" aria-hidden="true" class="h-8 w-8"></LoadingIndicator>
        </div>

      </form>

    </template>
  </section>
</template>

<script>
import Celebration from "./components/Celebration.vue"
import AccessibilityRequest from "./AccessibilityRequest.js"
import RequestTypeSelector from "./components/RequestTypeSelector.js"
import MainTextbox from "./components/MainTextbox.vue"
import AnonymitySelector from "./components/AnonymitySelector.js"
import LoadingIndicator from "./components/LoadingIndicator.vue"


import ContactForm from "./components/ContactForm.vue";
import Strings from "./Strings.js"

export default {
  data() {
    return {
      form: new AccessibilityRequest(),
      strings: Strings,
      state: {
        shouldDisplayCelebration: false,
        submittingForm: false
      }

    };
  },
  components: {
    RequestTypeSelector,
    Celebration,
    ContactForm,
    MainTextbox,
    AnonymitySelector,
    LoadingIndicator
  },
  methods: {
    async handleSubmitAction() {
      this.state.submittingForm = true;
      await this.form.submit();
      this.state.submittingForm = false;
      this.state.shouldDisplayCelebration = true;
    }
  }
};
</script>
<style>
@import "./index.css";
</style>
