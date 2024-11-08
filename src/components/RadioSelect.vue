<template>
  <fieldset class="flex flex-col gap-4 border border-gray-300 p-3">
    <legend class="font-semibold" :class="{ 'text-lg': level === 0 }">
      {{ legend }}
    </legend>

    <label
      v-for="[value, label] in Object.entries(options)"
      :key="getRadioId(label)"
      class="flex flex-row gap-2 items-center"
    >
      <input
        type="radio"
        :name="uid"
        :id="getRadioId(label)"
        :value="value"
        :checked="modelValue == value"
        @change="$emit('update:modelValue', value)"
        required
      />
      <span :for="getRadioId(label)">{{ label }}</span>
    </label>
  </fieldset>
</template>

<script setup>
import { computed } from "vue";
import { idManager } from '../classes/IdManager';

const props = defineProps({
  modelValue: {},
  legend: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  options: {
    type: Object,
    required: true,
  },
});

defineEmits(["update:modelValue"]);

const uid = computed(() => idManager.generateRadioGroupId(props.legend));

const getRadioId = (label) => `${uid.value}_${label.replace(/[^a-zA-Z0-9]+/g, "")}`;
</script>