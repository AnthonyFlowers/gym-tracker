import type { Exercise, LoggedExercise } from './exercise.interface';

export interface ExportedData {
    exercises: Exercise[];
    loggedExercises: LoggedExercise[];
}
