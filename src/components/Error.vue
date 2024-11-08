<template>
  <div
    ref="alertRef"
    role="alert"
    class="flex flex-col gap-2 border-l-4 p-4 mb-4 bg-red-200 border-red-800 text-red-800"
  >
    <h2 class="font-semibold text-xl">
      {{ title }}
    </h2>
    <p v-if="message" class="text-sm">{{ message }}</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick } from "vue";
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

const alertRef = ref(null);

const title = computed(() => strings.value.error.title);
const message = computed(() => strings.value.error.message);

onMounted(async () => {
  await nextTick();
  alertRef.value.scrollIntoView();
});
</script>
