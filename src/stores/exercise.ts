
import { startingExercises } from '@/models/consts';
import type { Exercise, Muscle } from '@/models/exercise.interface';
import { defineStore } from 'pinia';
import { GymTrackerDatabase } from '@/services/GymTrackerDatabase';
import { getClientDataServiceInstance } from '@/services/ClientDataService';

export const useExerciseStore = defineStore('exercise', {
    state: () => ({
        exercises: [] as (Exercise & { id?: number })[],
        db: getClientDataServiceInstance(),
        isLoaded: false,
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
        async loadExercises() {
            if (this.isLoaded) return;
            const dbExercises = await this.db.getExercises();
            if (dbExercises.length === 0) {
                await this.db.setExercises(startingExercises);
                this.exercises = startingExercises;
            } else {
                this.exercises = dbExercises;
            }
            this.isLoaded = true;
        },
        async setExercises(exercises: Exercise[]) {
            if (!exercises) return;
            await this.db.setExercises(exercises);
            this.exercises = exercises;
        }
    },
    persist: false,
});
