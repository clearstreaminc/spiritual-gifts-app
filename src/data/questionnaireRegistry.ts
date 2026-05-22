import spiritualGifts from './questionnaires/spiritual-gifts.json'
import sweetSaltySour from './questionnaires/sweet-salty-sour.json'

import type { Questionnaire } from '../types/questionnaire'

export const questionnaireRegistry: Record<string, Questionnaire> = {
  'spiritual-gifts': spiritualGifts as Questionnaire,
  'sweet-salty-sour': sweetSaltySour as Questionnaire,
}
