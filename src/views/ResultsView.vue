<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Card from 'primevue/card'

import { useQuestionnaireStore } from '../stores/useQuestionnaireStore'

const router = useRouter()
const store = useQuestionnaireStore()

const results = computed(() => store.calculateResults())

const topResults = computed(() => {
    const summaryCount = store.questionnaire.results.summaryCount

    if (results.value.length <= summaryCount) {
        return results.value
    }

    const cutoffScore =
        results.value[summaryCount - 1]?.score ?? 0

    if (!store.questionnaire.results.includeTies) {
        return results.value.slice(0, summaryCount)
    }

    return results.value.filter((result) => {
        return result.score >= cutoffScore
    })
})

function retakeQuestionnaire() {
    store.resetQuestionnaire()
    router.push('/')
}

function getCategoryDetail(category: string) {
    return store.questionnaire.categories?.find(
        (detail) => detail.name === category,
    )
}

function reviewQuestions() {
    store.currentQuestionIndex = 0
    router.push('/questionnaire')
}

function printResults() {
    window.print()
}

</script>

<template>
    <main class="min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
        <section class="mx-auto max-w-2xl">
            <Card class="rounded-xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800">
                <template #title>
                    Your Results
                </template>

                <template #content>
                    <p class="text-slate-600 dark:text-slate-300">
                        Your top
                        {{ store.questionnaire.results.summaryCount }}
                        {{ store.questionnaire.results.summaryCount === 1 ? 'result is' : 'results are' }}:
                    </p>

                    <div class="mt-6 space-y-4">
                        <div v-for="(result, index) in topResults" :key="result.category"
                            class="rounded-xl border border-slate-200 p-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-slate-500 dark:text-slate-400">
                                        #{{ index + 1 }}
                                    </p>

                                    <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                        {{ result.category }}
                                    </h2>
                                </div>

                                <span class="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    {{ result.score }}
                                </span>
                            </div>
                            <p class="mt-3 text-slate-600 dark:text-slate-300">
                                {{ getCategoryDetail(result.category)?.description }}
                            </p>

                            <div class="mt-3 flex flex-wrap gap-2">
                                <span v-for="reference in getCategoryDetail(result.category)?.references"
                                    :key="reference"
                                    class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                                    {{ reference }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button label="Review Questions" class="mt-4 w-full" severity="secondary"
                        @click="reviewQuestions" />

                    <Button label="Retake Questionnaire" class="mt-8 w-full" severity="secondary"
                        @click="retakeQuestionnaire" />

                    <Button label="View Detailed Results" class="mt-4 w-full"
                        @click="router.push('/results/details')" />

                    <Button label="Print / Save as PDF" class="mt-4 w-full" severity="secondary"
                        @click="printResults" />
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