import { createRouter, createWebHistory } from 'vue-router'

import WelcomeView from '../views/WelcomeView.vue'
import QuestionnaireView from '../views/QuestionnaireView.vue'
import ResultsView from '../views/ResultsView.vue'
import DetailedResultsView from '../views/DetailedResultsView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: QuestionnaireView,
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
    },
    {
      path: '/results/details',
      name: 'detailed-results',
      component: DetailedResultsView,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
    },
  ],
})

export default router
