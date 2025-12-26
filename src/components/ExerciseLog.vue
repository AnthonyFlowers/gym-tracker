<template>
    <table class="w-full text-sm text-left text-gray-500 border">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700">
            <tr class="pt-5">
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
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 text-left font-medium text-white w-1/8"
                ></th>
            </tr>
        </thead>

        <tbody class="bg-white">
            <tr v-for="exercise in getExercises()" :key="exercise.id">
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
                <td class="border-b border-gray-100 p-4 pl-8 text-black border-gray-700">
                    <ConfirmButton
                        @confirmed="deleteExercise(exercise.id)"
                        initialText="Delete"
                        confirmText="Confirm"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { useExerciseLogStore } from '@/stores/exercise-log';
import ConfirmButton from './ConfirmButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {
            exerciseLogStore: useExerciseLogStore(),
        };
    },
    mounted() {
        if (!this.exerciseLogStore.isLoaded) {
            this.loadExerciseLogs()
                .then(() => {})
                .catch(() => {
                    // TODO: Handle error appropriately
                    // Alert the user or log the error
                });
        }
    },
    components: { ConfirmButton },
    methods: {
        getExercises() {
            return [...this.exerciseLogStore.exerciseLog].reverse();
        },
        async deleteExercise(logId: string) {
            await this.exerciseLogStore.deleteLoggedExercise(logId);
        },
        async loadExerciseLogs() {
            await this.exerciseLogStore.loadExerciseLog();
        },
    },
});
</script>
