<template>
    <fieldset class="flex flex-col gap-4">
        <TextInput v-model="contact.name" :label="strings.contact_form.name.label" :required="true"></TextInput>
        <TextInput v-model="contact.email" :label="strings.contact_form.email.label" :required="true" type="email">
        </TextInput>

    </fieldset>
</template>
<script>
import TextInput from "./TextInput.js"
import Strings from "../Strings.js"

export default {
    props: ['contact'],

    components: {
        TextInput,
    },
    computed: {
        strings() {
            return Strings;
        }
    }
};
</script>
  