<script setup lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
    <div class="mx-auto flex flex-col h-screen">
        <NavigationBar />
        <div class="max-h-screen overflow-y-auto flex-grow p-6">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'App',
    components: {},
    data() {
        return {};
    },
    methods: {},
});
</script>
