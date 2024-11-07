<template>
  <section aria-live="polite">
    <Celebration v-if="state.shouldDisplayCelebration" :form="form" />

    <template v-else>
      <form
        v-if="form"
        class="flex flex-col gap-8"
        @submit.prevent="handleSubmitAction"
      >
        <RequestTypeSelector v-model="form.requestType" />

        <MainTextbox v-if="form.requestType" :form="form" />

        <AnonymitySelector
          v-if="form.requestType && form.canRequestAnonymity"
          v-model="form.anonymous"
        />

        <ContactForm
          v-if="form.requestType && !form.anonymous"
          :contact="form.contact"
        />

        <div v-show="form.requestType">
          <slot></slot>
        </div>

        <Error v-if="state.shouldDisplayError" :form="form" />

        <div v-if="form.requestType" class="flex flex-row items-center gap-2">
          <button
            type="submit"
            class="rounded bg-purple-800 text-white disabled:opacity-70 enabled:hover:bg-purple-700 enabled:dark:hover:bg-purple-900 px-4 py-2 md:w-fit"
            :disabled="state.submittingForm"
            :aria-busy="state.submittingForm"
          >
            {{ strings.submit_button_label }}
          </button>
          <LoadingIndicator
            v-if="state.submittingForm"
            aria-hidden="true"
            class="h-8 w-8"
          />
        </div>
      </form>
    </template>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStringsStore } from "./stores/StringsStore";
import Celebration from "./components/Celebration.vue";
import Error from "./components/Error.vue";
import AccessibilityRequest from "./classes/AccessibilityRequest.js";
import RequestTypeSelector from "./components/RequestTypeSelector.vue";
import MainTextbox from "./components/MainTextbox.vue";
import AnonymitySelector from "./components/AnonymitySelector.vue";
import LoadingIndicator from "./components/LoadingIndicator.vue";
import ContactForm from "./components/ContactForm.vue";

// Get strings from store
const stringsStore = useStringsStore();
const { strings } = storeToRefs(stringsStore);

// Define props
const props = defineProps({
  name: String,
  email: String,
});

// Reactive state
const form = ref(null);
const state = reactive({
  shouldDisplayCelebration: false,
  submittingForm: false,
  shouldDisplayError: false,
});

// Methods
const handleSubmitAction = async () => {
  state.submittingForm = true;
  try {
    await form.value.submit();
    state.shouldDisplayCelebration = true;
  } catch (error) {
    state.shouldDisplayError = true;
  }
  state.submittingForm = false;
};

// Lifecycle hooks
onMounted(() => {
  form.value = new AccessibilityRequest();

  if (props.email && props.name) {
    form.value.contact.email = props.email;
    form.value.contact.name = props.name;
  }
});
</script>

<style>
@import "./index.css";
</style>
