<template>
  <div
    class="flex flex-col gap-2 border-l-4 p-4 mb-4 bg-green-200 border-green-800 text-green-800"
  >
    <h2 class="font-semibold text-xl">
      {{ title }}
    </h2>
    <p v-if="message" class="text-sm">{{ message }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStringsStore } from "../stores/StringsStore";

const stringsStore = useStringsStore();
const { strings } = storeToRefs(stringsStore);

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const title = computed(
  () => strings.value.celebration.title[props.form.request_type]
);

const message = computed(() =>
  props.form.id
    ? strings.value.celebration.message.replace(":id", props.form.id)
    : null
);
</script>
