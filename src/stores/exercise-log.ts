import type { LoggedExercise } from '@/models/exercise.interface';
import { defineStore } from 'pinia';
import { getClientDataServiceInstance } from '@/services/ClientDataService';

interface ExerciseLogState {
    exerciseLog: LoggedExercise[];
    db: ReturnType<typeof getClientDataServiceInstance>;
    isLoaded: boolean;
}

export const useExerciseLogStore = defineStore('exerciseLog', {
    state: (): ExerciseLogState => ({
        exerciseLog: [] as LoggedExercise[],
        db: getClientDataServiceInstance(),
        isLoaded: false,
    }),
    getters: {
        getExerciseLog: (state) => state.exerciseLog,
    },
    actions: {
        async loadExerciseLog(): Promise<void> {
            if (this.isLoaded) return;
            const dbLogs = await this.db.getExerciseLog();
            this.exerciseLog = dbLogs;
            this.isLoaded = true;
        },
        async reloadExerciseLog(): Promise<void> {
            this.isLoaded = false;
            await this.loadExerciseLog();
        },
        async addExerciseLog(workout: LoggedExercise): Promise<void> {
            this.exerciseLog.push(workout);
            try {
                await this.db.addExerciseLog(workout);
            } catch (error) {
                console.error('Failed to add exercise log to database:', error);
                await this.reloadExerciseLog();
                // TODO: have this throw an error notification to the user
            }
        },
        async deleteLoggedExercise(logId: string): Promise<void> {
            this.exerciseLog = this.exerciseLog.filter((log) => log.id !== logId);
            try {
                await this.db.deleteLoggedExercise(logId);
            } catch (error) {
                console.error('Failed to delete exercise log from database:', error);
                await this.reloadExerciseLog();
                // TODO: have this throw an error notification to the user
            }
        },
        async setExerciseLog(exercises: LoggedExercise[]): Promise<void> {
            if (!exercises) return;
            await this.db.setExerciseLogs(exercises);
            this.exerciseLog = exercises;
        },
        async clearExerciseLog() {
            this.exerciseLog = [];
            try {
                await this.db.clearExerciseLogs();
            } catch (error) {
                console.error('Failed to clear exercise logs from database:', error);
                await this.reloadExerciseLog();
                // TODO: have this throw an error notification to the user
            }
        },
    },
    persist: false,
});
