import type { LoggedExercise } from '@/models/exercise.interface';

export const isValidExercise = (exercise: LoggedExercise): boolean => {
    if (!exercise.name || exercise.name.length === 0) {
        return false;
    }
    return true;
};
