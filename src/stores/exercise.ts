import { startingExercises } from '@/models/consts';
import type { Exercise, Muscle } from '@/models/exercise.interface';
import { defineStore } from 'pinia';

export const useExerciseStore = defineStore('exercise', {
    state: () => ({
        exercises: startingExercises,
    }),
    getters: {
        getExercises: (state) => state.exercises,
        getExerciseByName: (state) => (name: string) =>
            state.exercises.find((exercise) => exercise.name === name),
        getExercisesByMuscle: (state) => (muscle: Muscle) =>
            state.exercises.filter((exercise) =>
                exercise.muscleTargets.some((target) => target.muscle === muscle),
            ),
        getExerciseChoices: (state) => state.exercises.map((exercise) => exercise.name),
    },
    actions: {
        addExercise(exercise: Exercise) {
            this.exercises.push(exercise);
        },
    },
    persist: true,
});
