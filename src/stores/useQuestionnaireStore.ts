import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import questionsData from '@/data/questions.json'

import type { AnswerValue, Question, Result } from '../types/questionnaire'

const STORAGE_KEY = 'spiritual-gifts-questionnaire'

const questions = questionsData.questions as Question[]

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
      const score = answers.value[question.number] ?? 0

      totals[question.gift] = (totals[question.gift] ?? 0) + score
    })

    return Object.entries(totals)
      .map(([gift, score]) => ({
        gift,
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
