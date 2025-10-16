import { Muscle, MuscleActivationLevel, type Exercise } from './exercise.interface';

export const startingExercises: Exercise[] = [
    {
        name: 'Bench Press',
        muscleTargets: [
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_FRONT, activation: MuscleActivationLevel.MEDIUM },
            { muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.MEDIUM },
        ],
    },
    {
        name: 'Barbell Squat',
        muscleTargets: [
            { muscle: Muscle.QUADRICEPS, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.GLUTES, activation: MuscleActivationLevel.MEDIUM },
            { muscle: Muscle.CALFS, activation: MuscleActivationLevel.LOW },
            { muscle: Muscle.HIP_FLEXORS, activation: MuscleActivationLevel.LOW },
            { muscle: Muscle.HIP_ADDUCTORS, activation: MuscleActivationLevel.LOW },
        ],
    },
    {
        name: 'Deadlift',
        muscleTargets: [
            { muscle: Muscle.GLUTES, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.QUADRICEPS, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.HAMSTRINGS, activation: MuscleActivationLevel.MEDIUM },
            { muscle: Muscle.ERECTOR_SPINAE, activation: MuscleActivationLevel.HIGH },
        ],
    },
    {
        name: 'Seated Calf Raise',
        muscleTargets: [{ muscle: Muscle.CALFS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Calfs',
        muscleTargets: [{ muscle: Muscle.CALFS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Leg Curls',
        muscleTargets: [{ muscle: Muscle.HAMSTRINGS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Leg Extension',
        muscleTargets: [{ muscle: Muscle.QUADRICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Concentration Curl',
        muscleTargets: [{ muscle: Muscle.BICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Cable Curl',
        muscleTargets: [{ muscle: Muscle.BICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Cable Shoulders',
        muscleTargets: [
            { muscle: Muscle.DELT_FRONT, activation: MuscleActivationLevel.MEDIUM },
            { muscle: Muscle.DELT_LATERAL, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_REAR, activation: MuscleActivationLevel.LOW },
        ],
    },
    {
        name: 'Lat Pulldown',
        muscleTargets: [{ muscle: Muscle.LATS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Cable Row',
        muscleTargets: [
            { muscle: Muscle.LATS, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_REAR, activation: MuscleActivationLevel.LOW },
        ],
    },
    {
        name: 'TBar Row',
        muscleTargets: [{ muscle: Muscle.LATS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Barbell Row',
        muscleTargets: [{ muscle: Muscle.LATS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Chest Supported Row',
        muscleTargets: [{ muscle: Muscle.LATS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Dumbbell Row',
        muscleTargets: [{ muscle: Muscle.LATS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Bayesian Curls',
        muscleTargets: [{ muscle: Muscle.BICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Dips',
        muscleTargets: [
            { muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.MEDIUM },
        ],
    },
    {
        name: 'Dumbbell Tricep Press',
        muscleTargets: [{ muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Cable Tricep Press',
        muscleTargets: [{ muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Cable Pushdown',
        muscleTargets: [{ muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Skull Crushers',
        muscleTargets: [{ muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Rope Pushdown',
        muscleTargets: [{ muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Dumbbell Press',
        muscleTargets: [
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_FRONT, activation: MuscleActivationLevel.HIGH },
        ],
    },
    {
        name: 'Pec Deck',
        muscleTargets: [
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_FRONT, activation: MuscleActivationLevel.MEDIUM },
        ],
    },
    {
        name: 'Cable Flyes',
        muscleTargets: [
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_FRONT, activation: MuscleActivationLevel.MEDIUM },
        ],
    },
    {
        name: 'Dumbbell Flyes',
        muscleTargets: [
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_FRONT, activation: MuscleActivationLevel.MEDIUM },
        ],
    },
    {
        name: 'Incline Press',
        muscleTargets: [
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.HIGH },
            { muscle: Muscle.DELT_FRONT, activation: MuscleActivationLevel.MEDIUM },
        ],
    },
    {
        name: 'Leg Press',
        muscleTargets: [{ muscle: Muscle.QUADRICEPS, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Decline Bench',
        muscleTargets: [{ muscle: Muscle.CHEST, activation: MuscleActivationLevel.HIGH }],
    },
    {
        name: 'Seated Dips',
        muscleTargets: [
            { muscle: Muscle.CHEST, activation: MuscleActivationLevel.LOW },
            { muscle: Muscle.TRICEPS, activation: MuscleActivationLevel.HIGH },
        ],
    },
    {
        name: 'Pull Ups',
        muscleTargets: [{ muscle: Muscle.LATS, activation: MuscleActivationLevel.HIGH }],
    },
];
