import type { Exercise, LoggedExercise } from '@/models/exercise.interface';

export const generateExportData = (
    exercises: Exercise[],
    loggedExercises: LoggedExercise[],
): string => {
    return JSON.stringify({
        exercises,
        loggedExercises,
    });
};
