export type AnswerValue = 0 | 1 | 2 | 3

export interface Question {
  number: string
  text: string
  gift: string
}

export interface Result {
  gift: string
  score: number
}
