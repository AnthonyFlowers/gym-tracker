import Dexie from "dexie";

export class GymTrackerDatabase extends Dexie {
    exercises: Dexie.Table<{ id?: number; name: string }, number>;

    constructor() {
        super('GymTrackerDB');
        this.version(1).stores({
            exercises: '++id,name',
        });
        this.exercises = this.table('exercises');
    }
}
