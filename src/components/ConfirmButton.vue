<template>
    <div class="flex justify-between">
        <button
            v-if="!isConfirmed"
            @click="isConfirmed = true"
            class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300"
        >
            {{ initialText }}
        </button>
        <button
            v-if="isConfirmed"
            @click="handleConfirm"
            class="bg-red-200 hover:bg-red-300 text-black font-bold py-2 px-3 rounded cursor-pointer transition-colors duration-300 mr-1"
        >
            {{ confirmText }}
        </button>
        <button
            v-if="isConfirmed"
            @click="handleCancel"
            class="bg-yellow-200 hover:bg-yellow-300 text-black font-bold py-2 px-3 rounded cursor-pointer transition-colors duration-300"
        >
            {{ cancelText }}
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        initialText: {
            type: String,
            default: 'Click',
        },
        confirmText: {
            type: String,
            default: 'Are you sure?',
        },
        cancelText: {
            type: String,
            default: 'Nvm',
        },
    },
    data() {
        return {
            isConfirmed: false,
        };
    },
    methods: {
        handleConfirm() {
            this.isConfirmed = false;
            this.$emit('confirmed');
        },
        handleCancel() {
            this.isConfirmed = false;
        },
    },
});
</script>
