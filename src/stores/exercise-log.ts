import type { LoggedExercise } from '@/models/exercise.interface';
import { defineStore } from 'pinia';

export const useExerciseLogStore = defineStore('exerciseLog', {
    state: () => ({
        exerciseLog: [] as LoggedExercise[],
    }),
    getters: {
        getExerciseLog: (state) => [...state.exerciseLog],
    },
    actions: {
        addExercise(workout: LoggedExercise): void {
            this.exerciseLog.push(workout);
        },
        deleteExercise(exerciseId: string): void {
            const index = this.exerciseLog.findIndex((ex) => ex.id === exerciseId);
            if (index !== -1) {
                this.exerciseLog.splice(index, 1);
            }
        },
        setExerciseLog(exercises: LoggedExercise[]) {
            if (!exercises) return;
            this.exerciseLog = exercises;
        },
    },
    persist: true,
});
