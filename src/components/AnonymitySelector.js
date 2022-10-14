import { h } from 'vue'
import Strings from "../Strings.js"

export default {
    inheritAttrs: false,
    props: {
        modelValue: {},
    },
    emits: ['update:modelValue', 'next'],

    render() {
        const uid = `anonradio_${Math.ceil(Math.random() * 10000)}`;
        console.log(this.modelValue);

        return h('fieldset', { 'class': 'flex flex-col gap-4 border border-gray-300 p-3' }, [
            h('legend', { class: "font-semibold", innerText: Strings.anonymity_selector.legend }),
            ...([true, false]).map((requiresAnon) => {
                let sliceClasses = [
                    "flex",
                    "flex-row",
                    "gap-2",
                    'items-center'
                ];

                return h('label', {
                    class: sliceClasses.join(" ")
                }, [

                    h('input', {
                        name: uid,
                        id: `${uid}_${requiresAnon}`,
                        type: 'radio',
                        value: requiresAnon,
                        onInput: () => this.$emit('update:modelValue', requiresAnon),
                        checked: this.modelValue == requiresAnon,
                        class: '',
                        required: true,
                    }),

                    h('span', {
                        for: `${uid}_${requiresAnon}`,
                        innerText: requiresAnon ? Strings.anonymity_selector.choices.yes.label : Strings.anonymity_selector.choices.no.label
                    })
                ]);
            })

        ]);
    }
}