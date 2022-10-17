import { h } from 'vue'

export default {
    inheritAttrs: false,
    props: {
        modelValue: {},
        legend: String,
        options: Object // {value: label}
    },
    emits: ['change'],

    render() {

        const uid = `ri_${Math.ceil(Math.random() * 10000)}_${this.legend.replace(/[^a-zA-Z0-9]+/g, "")}`;

        return h('fieldset', { 'class': 'flex flex-col gap-4 border border-gray-300 p-3' }, [
            h('legend', { class: "font-semibold", innerText: this.legend }),
            ...Object.entries(this.options).map(([value, label]) => {
                let sliceClasses = [
                    "flex",
                    "flex-row",
                    "gap-2",
                    'items-center'
                ];

                const radioId = `${uid}_${label.replace(/[^a-zA-Z0-9]+/g, "")}`;

                return h('label', {
                    class: sliceClasses.join(" ")
                }, [

                    h('input', {
                        name: uid,
                        id: radioId,
                        type: 'radio',
                        value: value,
                        onChange: () => this.$emit('change', value),
                        checked: this.modelValue == value,
                        class: '',
                        required: true,
                    }),

                    h('span', {
                        for: radioId,
                        innerText: label
                    })
                ]);
            })

        ]);
    }
}