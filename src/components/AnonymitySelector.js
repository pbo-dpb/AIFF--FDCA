import { h } from 'vue'
import Strings from "../Strings.js"
import RadioSelect from './RadioSelect.js';
export default {
    inheritAttrs: false,
    props: {
        modelValue: {},
    },
    emits: ['update:modelValue'],

    render() {

        // We must cast the value to a string in order for radio buttons to work correctly
        // as booleans are casted to string inconsistently.
        let stringedValue = this.modelValue ? 'true' : 'false';

        return h(RadioSelect, {
            legend: Strings.anonymity_selector.legend,
            options: {
                "true": Strings.anonymity_selector.choices.yes.label,
                "false": Strings.anonymity_selector.choices.no.label
            },
            modelValue: stringedValue,
            onChange: (nv) => {
                if (nv === "true") nv = true
                else nv = false;

                this.$emit('update:modelValue', nv)
            },
        });

    }
}