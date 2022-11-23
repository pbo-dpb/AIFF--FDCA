<template>
    <fieldset class="flex flex-col gap-4 p-4 border border-purple-300 rounded shadow">

        <legend class="font-semibold px-4 text-lg">{{ strings.contact_form.legend }}</legend>


        <RadioSelect :level="1" :options="strings.contact_form.preferred_method.options"
            :legend="strings.contact_form.preferred_method.legend" v-model="contact.preferred_method"></RadioSelect>


        <TextInput :level="1" v-model="contact.name" :label="strings.contact_form.name.label" :required="true">
        </TextInput>


        <TextInput :level="1" v-model="contact.email" :label="strings.contact_form.email.label"
            :required="contact.preferred_method === 'email'" type="email">
        </TextInput>

        <TextInput :level="1" v-model="contact.phone" :label="strings.contact_form.phone.label"
            :required="contact.preferred_method === 'phone'" type="tel">
        </TextInput>

        <TextInput :level="1" v-model="contact.postal" :label="strings.contact_form.postal.label"
            :required="contact.preferred_method === 'postal'" type="multiline">
        </TextInput>
    </fieldset>
</template>
<script>
import TextInput from "./TextInput.js"
import Strings from "../Strings.js"
import RadioSelect from "./RadioSelect.js"

export default {
    props: ['contact'],

    components: {
        TextInput,
        RadioSelect
    },
    computed: {
        strings() {
            return Strings;
        }
    },
};
</script>
  