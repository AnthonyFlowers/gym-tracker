<template>
    <div>
        <div class="relative">
            <label for="workoutName" class="block tracking-wide text-black-700 font-bold mb-2"
                >Exercise</label
            >
            <select
                v-model="workoutName"
                id="workoutName"
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                <option
                    v-for="(exercise, index) in getExercises()"
                    :value="exercise.name"
                    :key="index"
                >
                    {{ exercise.name }}
                </option>
            </select>
            <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
                <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                </svg>
            </div>
        </div>
        <div class="py-3">
            <BasicButton @click="addExercise" text="Add New Exercise" />
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
        <div class="">
            <label
                for="workoutDate"
                class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Exercise Date</label
            >
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
import BasicButton from './BasicButton.vue';
import ConfirmButton from './ConfirmButton.vue';

export default {
    data() {
        return {
            workoutName: this.getFirstExerciseName(),
            notes: '',
            weight: 0,
            reps: 0,
            sets: 0,
            workoutDate: formatDate(new Date()),
        };
    },
    components: { BasicButton, ConfirmButton },
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
                this.exerciseLogStore.addExercise(exercise);
            } else {
                alert('invalid Exercise');
            }
        },
        clearWorkouts() {
            this.exerciseLogStore.$reset();
        },
        addExercise() {
            alert('add exercise not implemented');
        },
        getExercises() {
            return this.exerciseStore.exercises;
        },
        getFirstExerciseName() {
            return this.exerciseStore.exercises[0].name;
        },
    },
    setup() {
        return {
            exerciseLogStore: useExerciseLogStore(),
            exerciseStore: useExerciseStore(),
        };
    },
};
</script>

<style scoped>
/* div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}

label {
    display: block;
}

input[type='text'],
select {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type='submit'] {
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 14px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type='submit']:hover {
    background-color: #45a049;
} */
</style>
