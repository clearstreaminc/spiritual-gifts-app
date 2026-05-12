<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Card from 'primevue/card'

import QuestionProgress from '../components/QuestionProgress.vue'
import { useQuestionnaireStore } from '../stores/useQuestionnaireStore'

import type { AnswerValue } from '../types/questionnaire'

const router = useRouter()
const store = useQuestionnaireStore()

const answerOptions: {
    label: string
    value: AnswerValue
}[] = [
        { label: 'Much', value: 3 },
        { label: 'Some', value: 2 },
        { label: 'Little', value: 1 },
        { label: 'Not at all', value: 0 },
    ]

const currentQuestionNumber = computed(() => {
    return store.currentQuestionIndex + 1
})

function selectAnswer(value: AnswerValue) {
    if (!store.currentQuestion) return

    store.answerQuestion(store.currentQuestion.number, value)
}

function goNext() {
    if (store.currentQuestionIndex === store.questions.length - 1) {
        router.push('/results')
        return
    }

    store.nextQuestion()
}

function goBack() {
    store.previousQuestion()
}
</script>

<template>
    <main class="min-h-screen bg-slate-50 p-6">
        <section class="mx-auto max-w-2xl">
            <QuestionProgress :current="currentQuestionNumber" :total="store.questions.length"
                :progress="store.progressPercent" />

            <Transition name="question-slide" mode="out-in">
                <Card :key="store.currentQuestion?.number" class="mt-6 rounded-2xl">
                    <template #title>
                        Question {{ currentQuestionNumber }}
                    </template>

                    <template #content>
                        <p class="text-xl leading-relaxed text-slate-800">
                            {{ store.currentQuestion?.text }}
                        </p>

                        <div class="mt-8 grid gap-4">
                            <Button v-for="option in answerOptions" :key="option.value" :label="option.label"
                                class="min-h-16 w-full text-lg" :outlined="store.answers[store.currentQuestion?.number ?? ''] !== option.value
                                    " @click="selectAnswer(option.value)" />
                        </div>
                    </template>
                </Card>
            </Transition>

            <div class="mt-8 flex gap-4">
                <Button label="Back" severity="secondary" class="min-h-14 flex-1"
                    :disabled="store.currentQuestionIndex === 0" @click="goBack" />

                <Button :label="store.currentQuestionIndex === store.questions.length - 1
                    ? 'See Results'
                    : 'Next'
                    " class="min-h-14 flex-1" :disabled="store.answers[store.currentQuestion?.number ?? ''] === undefined
                        " @click="goNext" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.question-slide-enter-active,
.question-slide-leave-active {
    transition:
        opacity 180ms ease,
        transform 180ms ease;
}

.question-slide-enter-from {
    opacity: 0;
    transform: translateX(16px);
}

.question-slide-leave-to {
    opacity: 0;
    transform: translateX(-16px);
}
</style>