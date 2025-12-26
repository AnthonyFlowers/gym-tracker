import type { Exercise, LoggedExercise } from '@/models/exercise.interface';
import { GymTrackerDatabase } from './GymTrackerDatabase';

class ClientDataService {
    private gymTrackerDatabase;

    constructor(gymTrackerDatabase = new GymTrackerDatabase()) {
        this.gymTrackerDatabase = gymTrackerDatabase;
    }

    async getExercises() {
        const query = await this.gymTrackerDatabase.getExercises();
        return query;
    }

    async deleteExercise(exerciseId: number) {
        await this.gymTrackerDatabase.exercises.delete(exerciseId);
    }

    async setExercises(exercises: Exercise[]) {
        await this.gymTrackerDatabase.exercises.clear();
        for (const exercise of exercises) {
            await this.gymTrackerDatabase.exercises.add(exercise);
        }
    }

    async getExerciseByName(name: string) {
        const query = await this.gymTrackerDatabase.exercises.where('name').equals(name).first();
        return query;
    }

    async getExercisesByMuscle(muscle: string) {
        const allExercises = await this.gymTrackerDatabase.exercises.toArray();
        const result = allExercises.filter((exercise) => exercise.name.includes(muscle));
        return result;
    }

    async getExerciseLog() {
        const query = await this.gymTrackerDatabase.getExerciseLogs();
        return query;
    }

    async addExerciseLog(log: LoggedExercise) {
        await this.gymTrackerDatabase.addExerciseLog(log);
    }

    async deleteLoggedExercise(logId: string) {
        await this.gymTrackerDatabase.deleteLoggedExercise(logId);
    }

    async setExerciseLogs(logs: LoggedExercise[]) {
        await this.gymTrackerDatabase.setExerciseLogs(logs);
    }
}

let clientDataServiceInstance: ClientDataService;

export function getClientDataServiceInstance(): ClientDataService {
    if (!clientDataServiceInstance) {
        clientDataServiceInstance = new ClientDataService();
    }
    return clientDataServiceInstance;
}
