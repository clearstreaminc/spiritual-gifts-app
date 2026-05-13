<script setup lang="ts">
import ProgressBar from 'primevue/progressbar'

defineProps<{
    current: number
    total: number
    progress: number
}>()
</script>

<template>
    <div>
        <div class="mb-2 flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Question {{ current }} of {{ total }}</span>
            <span>{{ progress }}%</span>
        </div>

        <ProgressBar :value="progress" />
    </div>
</template>