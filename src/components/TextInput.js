import { h } from 'vue'
import Strings from "../Strings.js"

export default {
    inheritAttrs: false,
    props: {
        'modelValue': {},
        'label': { type: String, required: true },
        'type': {
            type: String, default: 'text', validator(value) {
                return ['text', 'email', 'number', 'tel', 'multiline'].includes(value)
            }
        },
        'required': { type: Boolean, default: false },
        'hint': { type: String },
        'error': { type: String },
        'level': { type: Number, default: 0 }

    },
    emits: ['update:modelValue'],
    data() {
        return {
            shouldDisplayValidationState: false
        }
    },

    render() {
        const uid = `i_${Math.ceil(Math.random() * 10000)}_${this.label.replace(/[^a-zA-Z0-9]+/g, "")}`;

        let nodes = [];

        if (this.hint) {
            nodes.push(h('div', {
                id: `hint_${uid} `,
                class: "text-sm",
                innerText: this.hint
            }));
        }


        let baseClasses = [
            `border`,
            `border-gray-300`,
            `dark:border-gray-700`,
            `rounded`, `p-1`,
            `peer`
        ];


        nodes.push(h(this.type === 'multiline' ? 'textarea' : 'input', {
            ...this.$attrs,
            type: this.type,
            class: [
                ...baseClasses,
                this.type === 'multiline' ? 'h-64' : '',
                this.shouldDisplayValidationState ? 'invalid:bg-red-100 invalid:dark:bg-red-900' : ''
            ].join(' '),
            id: uid,
            'aria-labelledby': this.hint ? `hint_${uid} ` : null,
            modelValue: this.modelValue,
            required: this.required,
            "aria-required": this.required,
            onInput: (event) => this.$emit('update:modelValue', event.target.value),
            onInvalid: () => this.shouldDisplayValidationState = true,
        }));


        nodes.push(h('label', {
            type: 'text',
            class: `font-semibold flex flex-row gap-1 items-center ${this.shouldDisplayValidationState ? 'peer-invalid:text-red-800 peer-invalid:dark:text-red-200' : ''} ${this.level === 0 ? 'text-lg' : ''}`,
            for: uid,
        }, [
            h('span', { innerText: this.label }),
            this.required ? h('span', { class: 'sr-only', innerText: `(${Strings.required_field_label})` }) : null,
            this.required ? h('span', { 'aria-hidden': true, innerText: `*`, class: 'text-red-800 dark:text-red-200' }) : null
        ]));


        return h('div', { 'class': 'flex flex-col-reverse block gap-1' }, nodes);
    }
}