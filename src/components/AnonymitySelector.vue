<template>
  <RadioSelect
    :legend="strings.anonymity_selector.legend"
    :options="{
      true: strings.anonymity_selector.choices.yes.label,
      false: strings.anonymity_selector.choices.no.label,
    }"
    :modelValue="stringedValue"
    @update:modelValue="handleUpdate"
  />
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStringsStore } from "../stores/StringsStore";
import RadioSelect from "./RadioSelect.vue";

const stringsStore = useStringsStore();
const { strings } = storeToRefs(stringsStore);

const props = defineProps({
  modelValue: {},
});

const emit = defineEmits(["update:modelValue"]);

const stringedValue = computed(() => (props.modelValue ? "true" : "false"));

const handleUpdate = (newValue) => {
  const booleanValue = newValue === "true";
  emit("update:modelValue", booleanValue);
};
</script>
