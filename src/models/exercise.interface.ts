export enum Muscle {
    CHEST = 'Chest',
    LATS = 'Latissimus Dorsi',
    DELT_FRONT = 'Anterior Deltoids',
    DELT_REAR = 'Posterior Deltoids',
    DELT_LATERAL = 'Lateral Deltoids ',
    TRAPEZIUS = 'Trapezius',
    BICEPS = 'Biceps',
    TRICEPS = 'Triceps',
    ABS = 'Abs',
    OBLIQUES = 'Obliques',
    QUADRICEPS = 'Quadriceps',
    FOREARMS = 'Forearms',
    CALFS = 'Calves',
    GLUTES = 'Glutes',
    HAMSTRINGS = 'Hamstrings',
    HIP_ADDUCTORS = 'Hip Adductors',
    HIP_FLEXORS = 'Hip Flexors',
    ERECTOR_SPINAE = 'Erector Spinae',
}

export enum MuscleActivationLevel {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

interface MuscleTargets {
    muscle: Muscle;
    activation: MuscleActivationLevel;
}

export interface LoggedExercise {
    name: string;
    notes: string;
    weight: number;
    reps: number;
    sets: number;
    date: string;
    id: string;
}

export interface Exercise {
    name: string;
    muscleTargets: MuscleTargets[];
}
