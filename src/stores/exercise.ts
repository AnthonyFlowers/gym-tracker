import { startingExercises } from '@/models/consts';
import type { Exercise, Muscle } from '@/models/exercise.interface';
import { defineStore } from 'pinia';
import { getClientDataServiceInstance } from '@/services/ClientDataService';

export const useExerciseStore = defineStore('exercise', {
    state: () => ({
        exercises: [] as (Exercise & { id?: number })[],
        db: getClientDataServiceInstance(),
        isLoaded: false,
    }),
    getters: {
        getExercises: (state) => state.exercises,
        getExerciseByName:
            (state) =>
            (name: string): Exercise | undefined =>
                state.exercises.find((exercise) => exercise.name === name),
        getExercisesByMuscle:
            (state) =>
            (muscle: Muscle): Exercise[] =>
                state.exercises.filter((exercise) =>
                    exercise.muscleTargets.some((target) => target.muscle === muscle),
                ),
        getExerciseChoices: (state) => state.exercises.map((exercise) => exercise.name),
        getFirstExercise: (state) => (state.exercises.length > 0 ? state.exercises[0] : null),
    },
    actions: {
        async loadExercises() {
            try {
                if (this.isLoaded) return;
                const dbExercises = await this.db.getExercises();
                if (dbExercises.length === 0) {
                    await this.db.setExercises(startingExercises);
                    this.exercises = startingExercises;
                } else {
                    this.exercises = dbExercises;
                }
                this.isLoaded = true;
            } catch (error) {
                // TODO: Implement user-facing error handling
                console.error('Error loading exercises:', error);
            }
        },
        async setExercises(exercises: Exercise[]) {
            if (!exercises) return;
            await this.db.setExercises(exercises);
            this.exercises = exercises;
        },
    },
    persist: false,
});
