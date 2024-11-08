<template>
  <fieldset class="flex flex-col gap-4">
    <TextInput
      type="multiline"
      v-model="form.main"
      :label="label"
      :hint="hint"
      :required="true"
    />
  </fieldset>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStringsStore } from "../stores/StringsStore";
import TextInput from "./TextInput.vue";

const stringsStore = useStringsStore();
const { strings } = storeToRefs(stringsStore);

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const label = computed(
  () => strings.value.main_textbox[props.form.requestType].label
);

const hint = computed(
  () => strings.value.main_textbox[props.form.requestType].hint
);
</script>
