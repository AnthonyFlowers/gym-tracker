<template>
    <table class="border-collapse table-auto w-full text-sm">
        <thead>
            <tr>
                <th
                    class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-black w-1/2"
                >
                    Exercise
                </th>
                <th
                    class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-black w-1/12 text-center"
                >
                    Weight
                </th>
                <th
                    class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-black"
                >
                    Reps
                </th>
                <th
                    class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-black"
                >
                    Sets
                </th>
                <th
                    class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-black w-1/2"
                >
                    Date
                </th>
            </tr>
        </thead>

        <tbody class="bg-white">
            <tr v-for="exercise of getLatestExercises()" :key="exercise.id">
                <td
                    class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"
                >
                    {{ exercise.name }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"
                >
                    {{ exercise.weight }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"
                >
                    {{ exercise.reps }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"
                >
                    {{ exercise.sets }}
                </td>
                <td
                    class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"
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
    methods: {
        getLatestExercises() {
            return this.exerciseLogStore.exerciseLog.slice(-8).reverse();
        },
    },
};
</script>
