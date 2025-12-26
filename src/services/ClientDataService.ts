import type { Exercise, LoggedExercise } from '@/models/exercise.interface';
import { GymTrackerDatabase } from './GymTrackerDatabase';

class ClientDataService {
    private gymTrackerDatabase;

    constructor(gymTrackerDatabase = new GymTrackerDatabase()) {
        this.gymTrackerDatabase = gymTrackerDatabase;
    }

    async getExercises(): Promise<(Exercise & { id?: number })[]> {
        const query = await this.gymTrackerDatabase.getExercises();
        return query;
    }

    async deleteExercise(exerciseId: number): Promise<void> {
        await this.gymTrackerDatabase.exercises.delete(exerciseId);
    }

    async setExercises(exercises: Exercise[]): Promise<void> {
        await this.gymTrackerDatabase.exercises.clear();
        for (const exercise of exercises) {
            await this.gymTrackerDatabase.exercises.add(exercise);
        }
    }

    async getExerciseByName(name: string): Promise<Exercise | undefined> {
        return await this.gymTrackerDatabase.exercises.where('name').equals(name).first();
    }

    async getExercisesByMuscle(muscle: string): Promise<Exercise[]> {
        const allExercises = await this.gymTrackerDatabase.exercises.toArray();
        const filteredExercises = allExercises.filter((exercise) => exercise.name.includes(muscle));
        return filteredExercises;
    }

    async getExerciseLog(): Promise<LoggedExercise[]> {
        return await this.gymTrackerDatabase.getExerciseLog();
    }

    async addExerciseLog(log: LoggedExercise): Promise<void> {
        await this.gymTrackerDatabase.addExerciseLog(log);
    }

    async deleteLoggedExercise(logId: string): Promise<void> {
        await this.gymTrackerDatabase.deleteLoggedExercise(logId);
    }

    async setExerciseLogs(logs: LoggedExercise[]): Promise<void> {
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
