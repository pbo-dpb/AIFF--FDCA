import { h } from 'vue'
import Strings from "../Strings.js"

export default {
    inheritAttrs: false,
    props: {
        modelValue: {},
    },
    emits: ['update:modelValue', 'next'],

    render() {
        const uid = `typeradio_${Math.ceil(Math.random() * 10000)}`;


        return h('div', { 'class': 'flex flex-col border border-gray-300 divide-y divide-gray-300 rounded' }, [
            ...(Object.entries(Strings.request_types).map(([key, label]) => {

                let sliceClasses = ["flex",
                    "flex-row",
                    "gap-2",
                    "p-4",
                    "font-semibold",
                ];

                if (this.modelValue === key) {
                    sliceClasses = [...sliceClasses,
                        'bg-blue-800',
                        'text-white'
                    ]
                } else {
                    sliceClasses = [...sliceClasses,
                        'hover:bg-blue-100',
                        "cursor-pointer",
                    ];
                }
                return h('label', {
                    class: sliceClasses.join(" ")
                }, [

                    h('input', {
                        name: uid,
                        id: `${uid}_${key}`,
                        type: 'radio',
                        value: key,
                        onInput: () => this.$emit('update:modelValue', key),
                        selected: this.modelValue === key,
                        class: 'sr-only ',
                        required: true,
                    }),

                    h('span', {
                        for: `${uid}_${key}`,
                        innerText: label
                    })
                ]);
            }))

        ]);
    }
}