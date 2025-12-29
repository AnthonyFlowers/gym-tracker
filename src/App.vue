<template>
    <div class="mx-auto flex flex-col h-screen">
        <NavigationBar />
        <div class="max-h-screen overflow-y-auto flex-grow p-6">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';

export default defineComponent({
    name: 'App',
    components: { NavigationBar },
    data() {
        return {};
    },
    methods: {},
});
</script>
