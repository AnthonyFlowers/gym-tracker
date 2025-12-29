<script setup lang="ts">
import ExerciseInput from '@/components/ExerciseInput.vue';
import RecentWorkouts from '@/components/RecentExercises.vue';
</script>

<template>
    <div class="md:flex md:justify-between">
        <div class="md:w-1/2 pb-8 md:pb-0 mr-4">
            <ExerciseInput />
        </div>
        <div class="md:w-1/2 md:ml-4 mt-10">
            <RecentWorkouts />
        </div>
    </div>
</template>
