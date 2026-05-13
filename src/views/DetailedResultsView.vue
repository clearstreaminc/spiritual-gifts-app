<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Card from 'primevue/card'

import { useQuestionnaireStore } from '../stores/useQuestionnaireStore'
import { giftDetails } from '../data/giftDetails'

const router = useRouter()
const store = useQuestionnaireStore()

const results = computed(() => store.calculateResults())

function getGiftDetail(gift: string) {
    return giftDetails.find((detail) => detail.gift === gift)
}

function printResults() {
    window.print()
}
</script>

<template>
    <main class="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-900">
        <section class="mx-auto max-w-3xl">
            <Card>
                <template #title>
                    Detailed Results
                </template>

                <template #content>
                    <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Below is your full ranked list of spiritual gifts based on your questionnaire responses.
                    </p>

                    <div class="mt-5 space-y-3">
                        <div v-for="(result, index) in results" :key="result.gift"
                            class="rounded-xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800">
                            <div class="flex items-start justify-between gap-4">
                                <div>
                                    <p
                                        class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        #{{ index + 1 }}
                                    </p>

                                    <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        {{ result.gift }}
                                    </h2>
                                </div>

                                <div class="text-right">
                                    <p class="text-xs text-slate-500 dark:text-slate-400">
                                        Score
                                    </p>
                                    <p class="text-xl font-bold text-slate-800 dark:text-slate-100">
                                        {{ result.score }}
                                    </p>
                                </div>
                            </div>

                            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {{ getGiftDetail(result.gift)?.description }}
                            </p>

                            <div class="mt-3 flex flex-wrap gap-2">
                                <span v-for="scripture in getGiftDetail(result.gift)?.scriptures" :key="scripture"
                                    class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                                    {{ scripture }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Button label="Back to Summary" severity="secondary" class="min-h-12 flex-1"
                            @click="router.push('/results')" />

                        <Button label="Print / Save as PDF" class="min-h-12 flex-1" @click="printResults" />
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<style scoped>
@media print {
    :global(body) {
        background: white;
    }

    button,
    .p-button {
        display: none !important;
    }

    main {
        background: white !important;
        padding: 0 !important;
    }
}
</style>