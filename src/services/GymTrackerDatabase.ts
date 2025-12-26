

import Dexie from "dexie";
import type { Table } from "dexie";
import type { Exercise, LoggedExercise } from "@/models/exercise.interface";
import { startingExercises } from "@/models/consts";

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

    async addExercise(exercise: Exercise) {
        return await this.exercises.add(exercise);
    }

    async getExercises(): Promise<(Exercise & { id?: number })[]> {
        const all = await this.exercises.toArray();
        if (all.length === 0) {
            await this.setExercises(startingExercises);
            return [...startingExercises];
        }
        return all;
    }

    async setExercises(exercises: Exercise[]) {
        await this.exercises.clear();
        await this.exercises.bulkAdd(exercises);
    }

    async addExerciseLog(log: LoggedExercise) {
        return await this.exerciseLogs.add(log);
    }

    async getExerciseLogs(): Promise<LoggedExercise[]> {
        return await this.exerciseLogs.toArray();
    }

    async setExerciseLogs(logs: LoggedExercise[]) {
        await this.exerciseLogs.clear();
        await this.exerciseLogs.bulkAdd(logs);
    }

    async deleteLoggedExercise(id: string) {
        await this.exerciseLogs.delete(id);
    }
}
