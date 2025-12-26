<template>
    <div class="flex flex-col">
        <BasicButton @click="exportData" text="Export"></BasicButton>
        <label for="file-input" class="mt-10"
            >Choose file to upload <i class="text-red">*this will replace all data*</i></label
        >
        <input
            id="file-input"
            class="relative my-5 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3 file:py-[0.32rem] file:text-surface"
            type="file"
            accept=".json,application/json"
            @change="handleFileUpload($event)"
        />
    </div>
</template>

<script lang="ts">
import { formatDateTime } from '@/helpers/date';
import { generateExportData } from '@/helpers/manage-data';
import { useExerciseStore } from '@/stores/exercise';
import { useExerciseLogStore } from '@/stores/exercise-log';
import BasicButton from './BasicButton.vue';
import type { ExportedData } from '@/models/data-management';
import { defineComponent } from 'vue';
import { newError } from '@/models/error';

export default defineComponent({
    data() {
        return {
            exerciseStore: useExerciseStore(),
            exerciseLogStore: useExerciseLogStore(),
        };
    },
    components: { BasicButton },
    methods: {
        exportData() {
            try {
                const blob = new Blob([this.generateExport()], {
                    type: 'text/plain;charset=utf-8',
                });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `gym-log_${formatDateTime(new Date())}.json`;
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error(error);
            }
        },
        importData(data: ExportedData) {
            this.exerciseStore.setExercises(data.exercises);
            this.exerciseLogStore.setExerciseLog(data.loggedExercises);
            // TODO: Add notification of successful import with number of exercises/logs imported
        },
        handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            if (!target.files) {
                return;
            }
            const file = target.files[0];
            try {
                const reader = new FileReader();
                reader.onload = (e): void => {
                    try {
                        if (!e.target?.result || typeof e.target.result !== 'string') {
                            throw newError('Invalid file content');
                        }
                        const json = JSON.parse(e.target.result) as ExportedData;
                        this.importData(json);
                    } catch {
                        console.error('Invalid JSON');
                    }
                };
                reader.onerror = (): void => {
                    console.log('error reading file');
                };

                reader.readAsText(file);
            } catch (err) {
                console.error(err);
            }
        },
        generateExport() {
            return generateExportData(
                this.exerciseStore.exercises,
                this.exerciseLogStore.exerciseLog,
            );
        },
    },
});
</script>
