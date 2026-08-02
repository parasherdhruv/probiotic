import { create } from 'zustand'

export type QuizStep = 'intro' | 'goal' | 'diet' | 'age' | 'analyzing' | 'result'

interface QuizState {
  step: QuizStep
  answers: {
    goal?: string
    diet?: string
    age?: string
  }
  setStep: (step: QuizStep) => void
  setAnswer: (key: keyof QuizState['answers'], value: string) => void
  reset: () => void
  getRecommendation: () => string
}

export const useQuizStore = create<QuizState>((set, get) => ({
  step: 'intro',
  answers: {},
  setStep: (step) => set({ step }),
  setAnswer: (key, value) => set((state) => ({ 
    answers: { ...state.answers, [key]: value } 
  })),
  reset: () => set({ step: 'intro', answers: {} }),
  
  // Weighted scoring engine
  getRecommendation: () => {
    const { goal, diet, age } = get().answers
    
    // Base scores for products
    let scores = {
      'daily-core': 0,
      'immune-defense': 0,
      'active-recovery': 0
    }

    // 1. Goal carries the highest weight
    if (goal === 'digestion') scores['daily-core'] += 10
    if (goal === 'immunity') scores['immune-defense'] += 10
    if (goal === 'fitness') scores['active-recovery'] += 10
    if (goal === 'general') {
      scores['daily-core'] += 5
      scores['immune-defense'] += 5
    }

    // 2. Age modifiers
    if (age === '51+') {
      // Older adults often benefit more from immune and core support
      scores['immune-defense'] += 3
      scores['daily-core'] += 2
    }
    
    // 3. Diet modifiers
    if (diet === 'vegan') {
      // All are vegan, but let's give a slight bump to core as a foundation
      scores['daily-core'] += 1
    }

    // Find the product with the highest score
    const recommendedProduct = Object.keys(scores).reduce((a, b) => 
      scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b
    )

    return recommendedProduct
  }
}))
