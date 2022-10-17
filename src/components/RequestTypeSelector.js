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

        return h('fieldset', [

            h('legend', { innerText: Strings.request_types.legend, class: 'text-lg font-semibold mb-1' }),
            h('div', {
                'class':
                    'flex flex-col border border-gray-300 divide-y divide-gray-300 rounded'
            }, [
                ...(Object.entries(Strings.request_types.options).map(([key, label]) => {

                    let sliceClasses = ["flex",
                        "motion-safe:transition-all",
                        "flex-row",
                        "gap-2",
                        "px-4",
                        this.modelValue ? "py-4 motion-safe:py-2" : "py-4",
                        "font-semibold",
                    ];

                    if (this.modelValue === key) {
                        sliceClasses = [...sliceClasses,
                            'bg-purple-800',
                            'text-white'
                        ]
                    } else {
                        sliceClasses = [...sliceClasses,
                            'hover:bg-purple-100',
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
                            checked: this.modelValue === key,
                            class: 'sr-only ',
                            required: true,
                        }),

                        h('span', {
                            for: `${uid}_${key}`,
                            innerText: label
                        })
                    ]);
                }))

            ])
        ]);
    }
}