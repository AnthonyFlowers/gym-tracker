import { startingSplits } from '@/models/consts';
import type { Split, SplitFocus } from '@/models/workout-split.interface';
import { defineStore } from 'pinia';

export const useWorkoutSplitStore = defineStore('workoutSplitStore', {
    state: () => ({
        splits: startingSplits,
    }),
    getters: {
        getSplits: (state) => state.splits,
        getSplitByName: (state) => (splitName: string) => {
            return state.splits.find((split) => split.name === splitName);
        },
        getSplitByFocus: (state) => (splitFocus: SplitFocus) => {
            return state.splits.find((split) => split.focus === splitFocus);
        },
    },
    actions: {
        adddSplit(split: Split) {
            this.splits.push(split);
        },
        updateSplit(split: Split) {
            const index = this.splits.findIndex((s) => s.name === split.name);
            if (index !== -1) {
                this.splits.splice(index, 1);
                this.splits.push(split);
            }
        },
    },
    persist: true,
});
