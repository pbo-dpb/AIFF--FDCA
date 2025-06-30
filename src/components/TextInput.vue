<template>
  <div class="flex flex-col gap-1">

    <label :for="uid" :class="[
      'font-semibold flex flex-row gap-1 items-center',
      shouldDisplayValidationState
        ? 'peer-invalid:text-red-800 dark:peer-invalid:text-red-200'
        : '',
      level === 0 ? 'text-lg' : '',
    ]">
      <span>{{ label }}</span>
      <span v-if="required" class="sr-only">({{ strings.required_field_label }})</span>
      <span v-if="required" aria-hidden="true" class="text-red-800 dark:text-red-200">*</span>
    </label>

    <component :is="type === 'multiline' ? 'textarea' : 'input'" v-bind="$attrs" :type="type" :class="[
      ...baseClasses,
      type === 'multiline' ? 'h-64' : '',
      shouldDisplayValidationState
        ? 'invalid:bg-red-100 dark:invalid:bg-red-900'
        : '',
    ]" :id="uid" :aria-labelledby="hint ? `hint_${uid}` : null" :value="modelValue" :required="required"
      :aria-required="required" @input="$emit('update:modelValue', $event.target.value)"
      @invalid="shouldDisplayValidationState = true" />


    <div v-if="hint" :id="`hint_${uid}`" class="text-sm">
      {{ hint }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStringsStore } from "../stores/StringsStore";
import { idManager } from "../classes/IdManager";

const stringsStore = useStringsStore();
const { strings } = storeToRefs(stringsStore);

const props = defineProps({
  modelValue: {},
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "email", "number", "tel", "multiline"].includes(value);
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
  },
  error: {
    type: String,
  },
  level: {
    type: Number,
    default: 0,
  },
});

defineEmits(["update:modelValue"]);

const shouldDisplayValidationState = ref(false);

const uid = computed(() => idManager.generateInputId(props.label));

const baseClasses = [
  "border",
  "border-solid",
  "border-gray-300",
  "dark:border-gray-700",
  "rounded-sm",
  "p-2",
  "peer",
  "dark:bg-gray-800",
  "dark:text-white",
];

defineOptions({
  inheritAttrs: false,
});
</script>
