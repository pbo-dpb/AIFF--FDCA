<template>
    <fieldset>
        <legend class="mb-1 text-lg font-semibold">
            {{ strings.request_types.legend }}
        </legend>

        <div
            class="flex flex-col divide-y divide-gray-300 rounded-sm border border-solid border-gray-300">
            <label
                v-for="[key, label] in Object.entries(
                    strings.request_types.options,
                )"
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
                        ? ['bg-sky-800', 'text-white']
                        : [
                              'hover:bg-sky-100',
                              'dark:hover:bg-sky-900',
                              'cursor-pointer',
                          ],
                ]">
                <input
                    :name="uid"
                    :id="`${uid}_${key}`"
                    type="radio"
                    :value="key"
                    :checked="modelValue === key"
                    @input="$emit('update:modelValue', key)"
                    class="sr-only"
                    required />
                <span :for="`${uid}_${key}`">{{ label }}</span>
            </label>
        </div>
    </fieldset>
</template>

<script setup>
    import { computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useStringsStore } from "../stores/StringsStore";
    import { idManager } from "../classes/IdManager";

    const stringsStore = useStringsStore();
    const { strings } = storeToRefs(stringsStore);

    const props = defineProps({
        modelValue: {},
    });

    defineEmits(["update:modelValue", "next"]);

    const uid = computed(() => idManager.generateTypeRadioId());
</script>
