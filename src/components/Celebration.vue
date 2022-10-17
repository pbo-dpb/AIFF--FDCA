<template>

    <div class="flex flex-col gap-2 border-l-4 p-4 mb-4  bg-green-200 border-green-800 text-green-800">
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
            return Strings.celebration.title[this.form.request_type]
        },
        message() {
            return Strings.celebration.message.replace(":id", this.form.id);
        }
    }
};
</script>
  