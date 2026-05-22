<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Card from 'primevue/card'

import { useQuestionnaireStore } from '../stores/useQuestionnaireStore'

const router = useRouter()
const store = useQuestionnaireStore()

const questionnaire = computed(() => {
    return store.questionnaire
})

const hasProgress = computed(() => {
    return Object.keys(store.answers).length > 0
})

onMounted(() => {
    if (!questionnaire.value) {
        router.replace('/error')
    }
})

function startQuestionnaire() {
    store.resetQuestionnaire()
    router.push('/questionnaire')
}

function resumeQuestionnaire() {
    router.push('/questionnaire')
}
</script>

<template>
    <main class="min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
        <section class="mx-auto flex min-h-screen max-w-xl flex-col justify-center">
            <Card v-if="questionnaire">
                <template #title>
                    {{ questionnaire.title }}
                </template>

                <template #content>
                    <p class="leading-relaxed text-slate-600 dark:text-slate-300">
                        {{ questionnaire.description }}
                    </p>

                    <div class="mt-8 flex flex-col gap-3">
                        <Button v-if="hasProgress" label="Resume Questionnaire" class="w-full"
                            @click="resumeQuestionnaire" />

                        <Button :label="hasProgress
                            ? 'Start Over'
                            : 'Start Questionnaire'
                            " severity="secondary" class="w-full" @click="startQuestionnaire" />
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>