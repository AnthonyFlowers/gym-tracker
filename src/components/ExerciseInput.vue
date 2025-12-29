<template>
    <div>
        <DropdownSelect
            :items="getExercises()"
            v-model="workoutName"
            label="Exercise"
            id="workoutName"
        />
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 my-6 md:mt-0 md:mb-0">
                <label for="weight">Weight</label>
                <input
                    type="number"
                    v-model="weight"
                    id="weight"
                    min="0"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label for="reps">Reps</label>
                <input
                    type="number"
                    v-model="reps"
                    id="reps"
                    min="0"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label for="sets">Sets</label>
                <input
                    type="number"
                    v-model="sets"
                    id="sets"
                    min="0"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </div>
        <div class="mb-6">
            <label for="workoutDate" class="block text-gray-700 mb-2">Exercise Date</label>
            <input
                type="date"
                v-model="workoutDate"
                id="workoutDate"
                class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="w-full mb-6">
            <label for="notes">Notes</label>
            <input
                type="text"
                v-model="notes"
                id="notes"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="flex space-x-6">
            <BasicButton text="Add" @click="addWorkout" />
            <BasicButton @click="addExercise" text="Add New Exercise" />
            <ConfirmButton
                initialText="Clear Log"
                confirmText="Confirm"
                @confirmed="clearWorkouts"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { formatDate } from '@/helpers/date';
import { useExerciseLogStore } from '@/stores/exercise-log';
import { isValidExercise } from '@/helpers/validation';
import { useExerciseStore } from '@/stores/exercise';

import BasicButton from '@/components/BasicButton.vue';
import ConfirmButton from '@/components/ConfirmButton.vue';
import DropdownSelect from '@/components/DropdownSelect.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            workoutName: '',
            notes: '',
            weight: 0,
            reps: 0,
            sets: 0,
            workoutDate: formatDate(new Date()),
        };
    },
    mounted() {
        this.loadExercises().then(() => {
            this.workoutName = this.getFirstExerciseName();
        });
    },
    components: { BasicButton, ConfirmButton, DropdownSelect },
    methods: {
        addWorkout() {
            const exercise = {
                name: this.workoutName,
                notes: this.notes,
                weight: this.weight,
                reps: this.reps,
                sets: this.sets,
                date: this.workoutDate,
                id: new Date().toISOString(),
            };
            if (isValidExercise(exercise)) {
                this.exerciseLogStore.addExerciseLog(exercise);
            } else {
                alert('Invalid Exercise');
            }
        },
        clearWorkouts() {
            this.exerciseLogStore.clearExerciseLog();
        },
        addExercise() {
            alert('Add exercise not implemented');
        },
        getExercises() {
            return this.exerciseStore.exercises;
        },
        getFirstExerciseName() {
            const exercise = this.exerciseStore.getFirstExercise;
            return exercise ? exercise.name : '';
        },
        async loadExercises() {
            await this.exerciseStore.loadExercises();
        },
    },
    setup() {
        return {
            exerciseLogStore: useExerciseLogStore(),
            exerciseStore: useExerciseStore(),
        };
    },
});
</script>
