import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { Exercise, LoggedExercise } from '@/models/exercise.interface';

export class GymTrackerDatabase extends Dexie {
    exercises: Table<Exercise & { id?: number }, number>;
    exerciseLogs: Table<LoggedExercise, string>;

    constructor() {
        super('GymTrackerDB');
        this.version(1).stores({
            exercises: '++id,name',
            exerciseLogs: 'id,date,name',
        });
        this.exercises = this.table('exercises');
        this.exerciseLogs = this.table('exerciseLogs');
    }

    async addExercise(exercise: Exercise): Promise<number> {
        return await this.exercises.add(exercise);
    }

    async getExercises(): Promise<(Exercise & { id?: number })[]> {
        return await this.exercises.toArray();
    }

    async setExercises(exercises: Exercise[]): Promise<void> {
        await this.exercises.clear();
        await this.exercises.bulkAdd(exercises);
    }

    async addExerciseLog(log: LoggedExercise): Promise<void> {
        await this.exerciseLogs.add(log);
    }

    async getExerciseLog(): Promise<LoggedExercise[]> {
        return await this.exerciseLogs.toArray();
    }

    async setExerciseLogs(logs: LoggedExercise[]): Promise<void> {
        await this.exerciseLogs.clear();
        await this.exerciseLogs.bulkAdd(logs);
    }

    async deleteLoggedExercise(id: string): Promise<void> {
        await this.exerciseLogs.delete(id);
    }
}
