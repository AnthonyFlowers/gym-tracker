
import type { LoggedExercise } from '@/models/exercise.interface';
import { defineStore } from 'pinia';
import { getClientDataServiceInstance } from '@/services/ClientDataService';

export const useExerciseLogStore = defineStore('exerciseLog', {
    state: () => ({
        exerciseLog: [] as LoggedExercise[],
        db: getClientDataServiceInstance(),
        isLoaded: false,
    }),
    getters: {
        getExerciseLogs: (state) => state.exerciseLog,
    },
    actions: {
        async loadExerciseLog() {
            if (this.isLoaded) return;
            const dbLogs = await this.db.getExerciseLog();
            console.log('Loaded exercise logs from DB:', dbLogs);
            this.exerciseLog = dbLogs;
            this.isLoaded = true;
        },
        async addExerciseLog(workout: LoggedExercise) {
            await this.db.addExerciseLog(workout);
            this.exerciseLog.push(workout);
        },
        async deleteExerciseLog(exerciseId: string) {
            await this.db.deleteExerciseLog(exerciseId);
            await this.loadExerciseLog();
        },
        async setExerciseLog(exercises: LoggedExercise[]) {
            if (!exercises) return;
            await this.db.setExerciseLogs(exercises);
            this.exerciseLog = exercises;
        },
    },
    persist: false,
});
