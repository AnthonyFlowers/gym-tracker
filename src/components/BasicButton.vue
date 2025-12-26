<template>
    <button
        class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300"
    >
        {{ text }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        text: {
            type: String,
            default: 'Click!',
        },
    },
    methods: {
        handleClick() {
            this.$emit('click');
        },
    },
});
</script>
