<template>
    <table class="w-full text-sm text-left text-gray-500 border-x">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700">
            <tr class="pt-5">
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 text-left font-medium text-white w-128"
                >
                    Exercise
                </th>
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 font-medium text-white text-center w-48"
                >
                    Max
                </th>
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 font-medium text-white text-center w-48"
                >
                    Last Lift
                </th>
                <th
                    class="border-b border-gray-200 p-4 pb-3 pl-8 font-medium text-white text-center w-48"
                >
                    Last Lift Date
                </th>
            </tr>
        </thead>

        <tbody class="bg-white">
            <tr v-for="(stat, index) in getStatistics()" :key="index">
                <td class="border-b border-gray-100 p-4 pl-8 text-black border-gray-700">
                    {{ stat.exerciseName }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-black border-gray-700 text-center"
                >
                    {{ stat.max }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-black border-gray-700 text-center"
                >
                    {{ stat.lastLiftWeight ?? '-' }}
                </td>
                <td
                    class="text-center border-b border-gray-100 p-4 pl-8 text-black border-gray-700 text-center"
                >
                    {{ stat.lastLiftDate ?? '-' }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { useExerciseLogStore } from '@/stores/exercise-log';
import { generateStatistics } from '@/helpers/statistics';
import { useExerciseStore } from '@/stores/exercise';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ExerciseStats',
    setup() {
        return {
            exerciseLogStore: useExerciseLogStore(),
            exerciseStore: useExerciseStore(),
        };
    },
    methods: {
        getStatistics() {
            return generateStatistics(
                this.exerciseStore.exercises,
                this.exerciseLogStore.exerciseLog,
            );
        },
    },
});
</script>
