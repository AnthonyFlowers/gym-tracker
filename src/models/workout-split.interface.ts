import type { Exercise, Muscle } from './exercise.interface';

interface Workout {
    name: string;
    exercises: Exercise[];
    musclesFocus: Muscle[];
}

export enum BlockPeriodizationFocus {
    WORK_CAPACITY = 'Increase Work Capacity',
    NERVOUS_SYSTEM = 'Nervous System Acclimation',
    NEW_PR = 'Set New Records',
    RECOVERY = 'Recover',
}

export type SplitFocus = BlockPeriodizationFocus | string;

interface Schedule {
    name: string;
    order: number;
    workoutDays: Workout[];
    length: number;
}

export interface Split {
    name: string;
    setsLower: number;
    setsHigher: number;
    repsLower: number;
    repsHigher: number;
    focus: SplitFocus;
    length: number; // Number of days for the split
    oneRepPercentageLower: number;
    oneRepPercentageHigher: number;
    schedule?: Schedule[];
}
