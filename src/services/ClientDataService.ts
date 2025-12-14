import { GymTrackerDatabase } from './GymTrackerDatabase';

export class ClientDataService {
    private gymTrackerDatabase;


    constructor(gymTrackerDatabase = new GymTrackerDatabase()) {
        this.gymTrackerDatabase = gymTrackerDatabase;
    }

    async getExercises() {
        const query = await this.gymTrackerDatabase.exercises.toArray();
        return query;
    }

    async addExercise(exerciseName: string) {
        await this.gymTrackerDatabase.exercises.add({ name: exerciseName });
    }

    async deleteExercise(exerciseId: number) {
        await this.gymTrackerDatabase.exercises.delete(exerciseId);
    }

    async setExercises(exercises: { id: number | null; name: string }[]) {
        await this.gymTrackerDatabase.exercises.clear();
        for (const exercise of exercises) {
            await this.gymTrackerDatabase.exercises.add({ id: exercise.id ?? undefined, name: exercise.name });
        }
    }

    async getExerciseByName(name: string) {
        const query = await this.gymTrackerDatabase.exercises.where('name').equals(name).first();
        return query;
    }

    async getExercisesByMuscle(muscle: string) {
        const allExercises = await this.gymTrackerDatabase.exercises.toArray();
        const result = allExercises.filter(exercise => exercise.name.includes(muscle));
        return result;
    }
}
