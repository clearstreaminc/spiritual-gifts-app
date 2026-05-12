<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Card from 'primevue/card'
import { giftDetails } from '../data/giftDetails'

import { useQuestionnaireStore } from '../stores/useQuestionnaireStore'

const router = useRouter()
const store = useQuestionnaireStore()

const results = computed(() => store.calculateResults())

const topResults = computed(() => results.value.slice(0, 3))

function retakeQuestionnaire() {
    store.resetQuestionnaire()
    router.push('/')
}

function getGiftDetail(gift: string) {
    return giftDetails.find((detail) => detail.gift === gift)
}

</script>

<template>
    <main class="min-h-screen bg-slate-50 p-6">
        <section class="mx-auto max-w-2xl">
            <Card>
                <template #title>
                    Your Results
                </template>

                <template #content>
                    <p class="text-slate-600">
                        Your highest scoring gifts are:
                    </p>

                    <div class="mt-6 space-y-4">
                        <div v-for="(result, index) in topResults" :key="result.gift"
                            class="rounded-xl border border-slate-200 p-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-slate-500">
                                        #{{ index + 1 }}
                                    </p>

                                    <h2 class="text-xl font-semibold text-slate-900">
                                        {{ result.gift }}
                                    </h2>
                                </div>

                                <span class="text-2xl font-bold text-slate-800">
                                    {{ result.score }}
                                </span>
                            </div>
                            <p class="mt-3 text-slate-600">
                                {{ getGiftDetail(result.gift)?.description }}
                            </p>

                            <div class="mt-3 flex flex-wrap gap-2">
                                <span v-for="scripture in getGiftDetail(result.gift)?.scriptures" :key="scripture"
                                    class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                    {{ scripture }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Button label="Retake Questionnaire" class="mt-8 w-full" severity="secondary"
                        @click="retakeQuestionnaire" />
                </template>
            </Card>
        </section>
    </main>
</template>