import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import appConfig from '../data/appConfig.json'
import { questionnaireRegistry } from '../data/questionnaireRegistry'

import type { AnswerValue, Result } from '../types/questionnaire'

const questionnaire = questionnaireRegistry[appConfig.activeQuestionnaireId] ?? null

const questions = questionnaire?.questions ?? []
const STORAGE_KEY = questionnaire ? `questionnaire:${questionnaire.id}` : 'questionnaire:error'

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const currentQuestionIndex = ref(0)

  const answers = ref<Record<string, AnswerValue>>({})

  const savedState = localStorage.getItem(STORAGE_KEY)

  if (savedState) {
    const parsed = JSON.parse(savedState)

    currentQuestionIndex.value = parsed.currentQuestionIndex ?? 0
    answers.value = parsed.answers ?? {}
  }

  const isComplete = computed(() => {
    return currentQuestionIndex.value >= questions.length
  })

  const currentQuestion = computed(() => {
    return questions[currentQuestionIndex.value]
  })

  const progressPercent = computed(() => {
    return Math.round((Object.keys(answers.value).length / questions.length) * 100)
  })

  function answerQuestion(questionNumber: string, value: AnswerValue) {
    answers.value[questionNumber] = value
  }

  function nextQuestion() {
    if (currentQuestionIndex.value < questions.length - 1) {
      currentQuestionIndex.value++
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
    }
  }

  function resetQuestionnaire() {
    currentQuestionIndex.value = 0
    answers.value = {}
    localStorage.removeItem(STORAGE_KEY)
  }

  function calculateResults(): Result[] {
    const totals: Record<string, number> = {}

    questions.forEach((question) => {
      if (!question.category) return

      const score = answers.value[question.id] ?? 0

      totals[question.category] = (totals[question.category] ?? 0) + Number(score)
    })

    return Object.entries(totals)
      .map(([category, score]) => ({
        category,
        score,
      }))
      .sort((a, b) => b.score - a.score)
  }

  watch(
    [currentQuestionIndex, answers],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentQuestionIndex: currentQuestionIndex.value,
          answers: answers.value,
        }),
      )
    },
    { deep: true },
  )

  return {
    questionnaire,
    questions,
    currentQuestionIndex,
    currentQuestion,
    answers,
    isComplete,
    progressPercent,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    resetQuestionnaire,
    calculateResults,
  }
})
