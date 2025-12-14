import { ErrorMessage, newError } from '@/models/error';
import type { DbId } from '@sqlite.org/sqlite-wasm';
import { sqlite3Worker1Promiser } from '@sqlite.org/sqlite-wasm';
import { ref } from 'vue';

const exerciseTable = {
    name: 'exercise',
    schema: `
        CREATE TABLE IF NOT EXISTS exercise (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `,
};

const exerciseLogTable = {
    name: 'exercise_log',
    schema: `
        CREATE TABLE IF NOT EXISTS exercise_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            notes TEXT,
            weight REAL NOT NULL,
            reps INTEGER NOT NULL,
            sets INTEGER NOT NULL,
            date STRING,
            exercise_id INTEGER,
            FOREIGN KEY(exercise_id) REFERENCES exercise (id) ON DELETE CASCADE
        );
    `,
};

const muscleTable = {
    name: 'muscle_table',
    schema: `
        CREATE TABLE IF NOT EXISTS muscle_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `,
};

const exerciseMuscleTargetTable = {
    name: 'exercise_muscle_target_table',
    schema: `
        CREATE TABLE IF NOT EXISTS exercise_muscle_target_table (
            exercise_id INTEGER,
            muscle_target_id INTEGER,
            activation_level INTEGER,
            FOREIGN KEY(exercise_id) REFERENCES exercise (id) ON DELETE CASCADE,
            FOREIGN KEY(muscle_target_id) REFERENCES muscle_table (id) ON DELETE CASCADE
        );
    `,
};

const databaseConfig = {
    filename: 'file:mydb.sqlite3?vfs=opfs',
    tables: {
        exerciseLogTable,
        exerciseTable,
        muscleTable,
        exerciseMuscleTargetTable,
    },
};

export function useSQLite() {
    const isLoading = ref(false);
    const error = ref<Error | null>(null);
    const isInitialized = ref(false);

    let promiser: ReturnType<typeof sqlite3Worker1Promiser> | null = null;
    let dbId: string | null = null;

    async function initialize() {
        if (isInitialized.value) return true;

        isLoading.value = true;
        error.value = null;

        try {
            // Initialize the SQLite worker
            promiser = await new Promise((resolve) => {
                const _promiser = sqlite3Worker1Promiser({
                    onready: () => resolve(_promiser),
                });
            });

            if (!promiser) throw newError(ErrorMessage.SQLPromiserInitializationError);

            // Get configuration and open database
            await promiser('config-get', {});
            const openResponse = await promiser('open', {
                filename: databaseConfig.filename,
            });

            if (openResponse.type === 'error') {
                throw newError(openResponse.result.message);
            }

            dbId = openResponse.result.dbId as string;

            // Create initial tables
            await promiser('exec', {
                dbId,
                sql: databaseConfig.tables.exerciseTable.schema,
            });
            await promiser('exec', {
                dbId,
                sql: databaseConfig.tables.exerciseLogTable.schema,
            });
            await promiser('exec', {
                dbId,
                sql: databaseConfig.tables.muscleTable.schema,
            });
            await promiser('exec', {
                dbId,
                sql: databaseConfig.tables.exerciseMuscleTargetTable.schema,
            });

            isInitialized.value = true;
            return true;
        } catch (err) {
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function executeQuery(sql: string, params: unknown[] = []) {
        if (!dbId || !promiser) {
            await initialize();
        }

        isLoading.value = true;
        error.value = null;

        try {
            if (!promiser) throw newError(ErrorMessage.SQLPromiserInitializationError);
            const result = await promiser('exec', {
                dbId: dbId as DbId,
                sql,
                bind: params,
                returnValue: 'resultRows',
            });

            if (result.type === 'error') {
                throw newError(result.result.message);
            }

            return result;
        } catch (err) {
            error.value = err instanceof Error ? err : newError('Query execution failed');
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        error,
        isInitialized,
        executeQuery,
    };
}
