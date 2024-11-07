<template>
  <fieldset>
    <legend class="text-lg font-semibold mb-1">
      {{ strings.request_types.legend }}
    </legend>

    <div class="flex flex-col border border-gray-300 divide-y divide-gray-300 rounded">
      <label
        v-for="[key, label] in Object.entries(strings.request_types.options)"
        :key="`${uid}_${key}`"
        :class="[
          'flex',
          'motion-safe:transition-all',
          'flex-row',
          'gap-2',
          'px-4',
          modelValue ? 'py-4 motion-safe:py-2' : 'py-4',
          'font-semibold',
          modelValue === key
            ? ['bg-purple-800', 'text-white']
            : [
                'hover:bg-purple-100',
                'hover:dark:bg-purple-900',
                'cursor-pointer',
              ],
        ]"
      >
        <input
          :name="uid"
          :id="`${uid}_${key}`"
          type="radio"
          :value="key"
          :checked="modelValue === key"
          @input="$emit('update:modelValue', key)"
          class="sr-only"
          required
        />
        <span :for="`${uid}_${key}`">{{ label }}</span>
      </label>
    </div>
  </fieldset>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStringsStore } from "../stores/StringsStore";
import { idManager } from '../classes/IdManager';

const stringsStore = useStringsStore();
const { strings } = storeToRefs(stringsStore);

const props = defineProps({
  modelValue: {},
});

defineEmits(["update:modelValue", "next"]);

const uid = computed(() => idManager.generateTypeRadioId());
</script>