import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ExerciseLogView from '../views/ExerciseLogView.vue';
import StatsView from '@/views/StatsView.vue';
import RecommendedExercises from '@/components/RecommendedExercises.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/log',
        name: 'exercise log',
        component: ExerciseLogView,
    },
    {
        path: '/stats',
        name: 'exercise stats',
        component: StatsView,
    },
    {
        path: '/recommended',
        name: 'recommended exercises',
        component: RecommendedExercises,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;
