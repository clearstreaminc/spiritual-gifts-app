# Generic Questionnaire App

A configurable questionnaire engine built with:

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- PrimeVue
- Capacitor (planned)

## Features

- Config-driven questionnaires
- Multiple questionnaire support
- Dynamic answer options
- Inventory-style scoring
- Detailed results views
- Mobile-friendly UI
- Dark mode support
- Persistent progress
- Print / Save as PDF support
- Error handling for invalid configuration

## Questionnaire Types

Currently supported:

- Inventory / profile questionnaires
  - Spiritual gifts
  - Personality-style assessments
  - Preference inventories

Planned:

- Traditional tests with correct / incorrect answers
- Branching question flow
- Weighted scoring
- Reverse-scored questions

## Project Structure

src/
data/
appConfig.json
questionnaireRegistry.ts
questionnaires/
spiritual-gifts.json
sweet-salty-sour.json

## Questionnaire Schema

Each questionnaire contains:

- title
- description
- answerOptions
- questions
- categories
- results configuration

Example:

```json
{
  "id": "sweet-salty-sour",
  "type": "inventory",
  "title": "Sweet vs Salty vs Sour",
  "description": "Discover whether your tastes lean sweet, salty, or sour.",
  "answerOptions": [
    {
      "label": "Strongly Agree",
      "value": 3
    },
    {
      "label": "Agree",
      "value": 2
    },
    {
      "label": "Disagree",
      "value": 1
    },
    {
      "label": "Strongly Disagree",
      "value": 0
    }
  ],
  "questions": [
    {
      "id": "q1",
      "number": "1",
      "text": "When I'm hungry, I naturally go grab a jar of pickles.",
      "category": "Sour"
    },
    {
      "id": "q2",
      "number": "2",
      "text": "My ideal movie snack is buttery popcorn with extra salt.",
      "category": "Salty"
    },
    {
      "id": "q3",
      "number": "3",
      "text": "My Tim Hortons coffee order usually includes extra sugar.",
      "category": "Sweet"
    },
    {
      "id": "q4",
      "number": "4",
      "text": "I enjoy sour candies more than chocolate bars.",
      "category": "Sour"
    },
    {
      "id": "q5",
      "number": "5",
      "text": "I would choose fries over cake almost every time.",
      "category": "Salty"
    },
    {
      "id": "q6",
      "number": "6",
      "text": "Dessert is usually my favorite part of the meal.",
      "category": "Sweet"
    }
  ],
  "categories": [
    {
      "name": "Sweet",
      "description": "You enjoy comforting, rich, sugary flavors and tend toward treats and desserts.",
      "references": ["Donuts", "Chocolate", "Ice Cream"]
    },
    {
      "name": "Salty",
      "description": "You gravitate toward savory, salty snacks and bold comfort foods.",
      "references": ["Fries", "Popcorn", "Chips"]
    },
    {
      "name": "Sour",
      "description": "You enjoy sharp, tangy, acidic flavors and adventurous snacks.",
      "references": ["Pickles", "Lemon Candy", "Vinegar Snacks"]
    }
  ],
  "results": {
    "summaryCount": 1,
    "includeTies": true
  }
}
```
