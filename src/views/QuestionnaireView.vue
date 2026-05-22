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

const questionnaire = computed(() => {
    return store.questionnaire
})

const answerOptions = computed(() => {
    return questionnaire.value.answerOptions
})

const currentQuestionNumber = computed(() => {
    return store.currentQuestionIndex + 1
})

function selectAnswer(value: AnswerValue) {
    if (!store.currentQuestion) return

    store.answerQuestion(
        store.currentQuestion.id,
        value,
    )

    window.setTimeout(() => {
        if (store.currentQuestionIndex === store.questions.length - 1) {
            router.push('/results')
            return
        }

        store.nextQuestion()
    }, 120)
}

function goNext() {
    if (store.currentQuestionIndex === store.questions.length - 1) {
        router.push('/results')
        return
    }

    store.nextQuestion()
}

function goBack() {
    if (store.currentQuestionIndex === 0) {
        router.push('/')
        return
    }

    store.previousQuestion()
}

</script>

<template>
    <main class="min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
        <section class="mx-auto max-w-2xl">
            <QuestionProgress :current="currentQuestionNumber" :total="store.questions.length"
                :progress="store.progressPercent" />

            <Transition name="question-slide" mode="out-in">
                <Card :key="store.currentQuestion?.number" class="mt-6 rounded-2xl dark:border-slate-700">
                    <template #title>
                        Question {{ currentQuestionNumber }}
                    </template>

                    <template #content>
                        <div class="flex min-h-[420px] flex-col">
                            <p class="text-xl leading-relaxed text-slate-800 dark:text-slate-100">
                                {{ store.currentQuestion?.text }}
                            </p>

                            <div class="mt-auto grid gap-4 pt-8">
                                <Button v-for="option in answerOptions" :key="option.value" :label="option.label"
                                    class="min-h-16 w-full text-lg" :severity="store.answers[store.currentQuestion?.id ?? ''] === option.value
                                        ? 'primary'
                                        : 'secondary'
                                        " :outlined="store.answers[store.currentQuestion?.id ?? ''] !== option.value
                                            " @click="selectAnswer(option.value)" />
                            </div>
                        </div>
                    </template>
                </Card>
            </Transition>

            <div class="mt-8 flex gap-4">
                <Button label="Back" severity="secondary" class="min-h-14 flex-1" @click="goBack" />

                <Button :label="store.currentQuestionIndex === store.questions.length - 1
                    ? 'See Results'
                    : 'Next'
                    " class="min-h-14 flex-1" :disabled="store.answers[store.currentQuestion?.id ?? ''] === undefined
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

:deep(.p-button:focus) {
    box-shadow: none;
}

@media (hover: none) {
    :deep(.p-button:hover) {
        background: var(--p-button-secondary-background);
        border-color: var(--p-button-secondary-border-color);
        color: var(--p-button-secondary-color);
    }
}
</style>