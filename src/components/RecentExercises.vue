<template>
    <table class="w-full text-sm text-left text-gray-500 border">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700">
            <tr>
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 text-left font-medium text-white w-128"
                >
                    Exercise
                </th>
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 font-medium text-white text-center w-24"
                >
                    Weight
                </th>
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 font-medium text-white text-center w-24"
                >
                    Reps
                </th>
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 font-medium text-white text-center w-24"
                >
                    Sets
                </th>
                <th class="border-b border-gray-200 p-4 pb-3 pl-8 font-medium text-white w-48">
                    Date
                </th>
            </tr>
        </thead>

        <tbody class="bg-white">
            <tr v-for="exercise of getLatestExercises()" :key="exercise.id">
                <td class="border-b border-gray-100 p-4 pl-8 text-black border-gray-700">
                    {{ exercise.name }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-black border-gray-700 text-center"
                >
                    {{ exercise.weight }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-black border-gray-700 text-center"
                >
                    {{ exercise.reps }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-black border-gray-700 text-center"
                >
                    {{ exercise.sets }}
                </td>
                <td
                    class="border-b border-gray-100 p-4 pl-4 text-black border-gray-700 text-center"
                >
                    {{ exercise.date }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { useExerciseLogStore } from '@/stores/exercise-log';

export default {
    setup() {
        return {
            exerciseLogStore: useExerciseLogStore(),
        };
    },
    mounted() {
        if(!this.exerciseLogStore.isLoaded) {
            this.loadExerciseLogs().then(() => {
                console.log('Exercise logs loaded successfully.');
            }).catch((error) => {
                console.error('Error loading exercise logs:', error);
            });
        }
    },
    methods: {
        getLatestExercises() {
            return this.exerciseLogStore.exerciseLog.slice(-8).reverse();
        },
        async loadExerciseLogs() {
            await this.exerciseLogStore.loadExerciseLog();
        },
    },
};
</script>
