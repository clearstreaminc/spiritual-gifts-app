export type QuestionnaireType = 'inventory' | 'test'

export type AnswerValue = string | number

export interface AnswerOption {
  label: string
  value: AnswerValue
}

export interface Question {
  id: string
  number: string
  text: string
  category?: string
}

export interface Category {
  name: string
  description?: string
  references?: string[]
}

export interface ResultsConfig {
  summaryCount: number
  includeTies: boolean
}

export interface Questionnaire {
  id: string
  type: QuestionnaireType
  title: string
  description?: string
  answerOptions: AnswerOption[]
  questions: Question[]
  categories?: Category[]
  results: ResultsConfig
}

export interface Result {
  category: string
  score: number
}
