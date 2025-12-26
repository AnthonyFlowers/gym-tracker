<template>
    <div class="relative">
        <label v-if="label" :for="id" class="block tracking-wide text-black-700 font-bold mb-2">
            {{ label }}
        </label>
        <select
            :id="id"
            class="block w-full bg-gray-200 border border-gray-200 text-gray-700 px-3 py-2.5 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            :value="modelValue"
            @change="onChange"
        >
            <option v-for="(item, index) in items" :key="index" :value="item[valueKey]">
                {{ item[labelKey] }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    name: 'DropdownSelect',
    props: {
        items: {
            type: Array as PropType<any[]>,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            required: true,
        },
        label: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: 'dropdown',
        },
        labelKey: {
            type: String,
            default: 'name',
        },
        valueKey: {
            type: String,
            default: 'name',
        },
    },
    emits: ['update:modelValue', 'change'],
    methods: {
        onChange(event: Event) {
            const value = (event.target as HTMLSelectElement).value;
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
    },
});
</script>
