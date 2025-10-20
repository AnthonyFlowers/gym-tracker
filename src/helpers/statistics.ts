import type { Exercise, LoggedExercise } from '@/models/exercise.interface';

interface Statistic {
    exerciseName: string;
    max: number;
    lastLiftDate: string | null;
    lastLiftWeight: number | null;
}

export const generateStatistics = (
    exercises: Exercise[],
    loggedExercises: LoggedExercise[],
): Statistic[] => {
    const statistics: Statistic[] = [];
    for (const exercise of exercises) {
        let max = 0;
        let lastLiftDate = null;
        let lastLiftWeight = null;
        for (const loggedExercise of loggedExercises) {
            if (exercise.name === loggedExercise.name) {
                max = loggedExercise.weight > max ? loggedExercise.weight : max;
                if (!lastLiftDate || loggedExercise.date > lastLiftDate) {
                    lastLiftDate = loggedExercise.date;
                    lastLiftWeight = loggedExercise.weight;
                }
            }
        }
        if (lastLiftDate) {
            statistics.push({ exerciseName: exercise.name, max, lastLiftDate, lastLiftWeight });
        }
    }
    return statistics;
};
