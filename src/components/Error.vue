<template>

    <div ref="alert" role="alert"
        class="flex flex-col gap-2 border-l-4 p-4 mb-4  bg-red-200 border-red-800 text-red-800">
        <h2 class="font-semibold text-xl">
            {{ title }}
        </h2>
        <p v-if="message" class="text-sm">{{ message }}</p>
    </div>


</template>
<script>
import Strings from "../Strings.js"

import AccessibilityRequest from '../AccessibilityRequest';


export default {
    props: {
        form: AccessibilityRequest
    },
    computed: {
        title() {
            return Strings.error.title
        },
        message() {
            return Strings.error.message
        }
    },
    mounted() {
        this.$nextTick(() => { this.$refs.alert.scrollIntoView() })
    }
};
</script>
  