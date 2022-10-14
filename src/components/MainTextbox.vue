<template>
    <fieldset class="flex flex-col gap-4">
        <TextInput type="multiline" v-model="form.main" :label="label" :hint="hint" :required="true"></TextInput>
    </fieldset>
</template>
<script>
import TextInput from "./TextInput.js"
import Strings from "../Strings.js"
import AccessibilityRequest from "../AccessibilityRequest";

export default {
    props: {
        'form': AccessibilityRequest
    },

    components: {
        TextInput,
    },
    computed: {

        label() {
            return Strings.main_textbox[this.form.requestType].label
        },
        hint() {
            return Strings.main_textbox[this.form.requestType].hint
        }
    }
};
</script>
  