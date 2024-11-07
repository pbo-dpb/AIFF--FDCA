<template>
  <fieldset
    class="flex flex-col gap-4 p-4 border border-purple-300 rounded shadow"
  >
    <legend class="font-semibold px-4 text-lg">
      {{ strings.contact_form.legend }}
    </legend>

    <RadioSelect
      :level="1"
      :options="strings.contact_form.preferred_method.options"
      :legend="strings.contact_form.preferred_method.legend"
      v-model="contact.preferred_method"
    />

    <TextInput
      :level="1"
      v-model="contact.name"
      :label="strings.contact_form.name.label"
      :required="true"
    />

    <TextInput
      :level="1"
      v-model="contact.email"
      :label="strings.contact_form.email.label"
      :required="contact.preferred_method === 'email'"
      type="email"
    />

    <TextInput
      :level="1"
      v-model="contact.phone"
      :label="strings.contact_form.phone.label"
      :required="contact.preferred_method === 'phone'"
      type="tel"
    />

    <TextInput
      :level="1"
      v-model="contact.postal"
      :label="strings.contact_form.postal.label"
      :required="contact.preferred_method === 'postal'"
      type="multiline"
    />
  </fieldset>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useStringsStore } from "../stores/StringsStore";
import TextInput from "./TextInput.vue";
import RadioSelect from "./RadioSelect.vue";

const stringsStore = useStringsStore();
const { strings } = storeToRefs(stringsStore);

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
});
</script>
