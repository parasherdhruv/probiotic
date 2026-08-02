import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { QUIZ_STORAGE_KEY } from '~/constants'

export interface QuizAnswer {
  questionId: string
  answerValues: string[]
}

interface QuizStore {
  currentStep: number
  answers: QuizAnswer[]
  isCompleted: boolean
  goalKey: string | null

  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  /** Upserts an answer — replaces existing answer for same questionId */
  addAnswer: (answer: QuizAnswer) => void
  setCompleted: (goalKey: string) => void
  reset: () => void
}

const initialState = {
  currentStep: 0,
  answers: [] as QuizAnswer[],
  isCompleted: false,
  goalKey: null as string | null,
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),

      prevStep: () =>
        set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),

      addAnswer: (answer) =>
        set((s) => ({
          answers: [
            ...s.answers.filter((a) => a.questionId !== answer.questionId),
            answer,
          ],
        })),

      setCompleted: (goalKey) => set({ isCompleted: true, goalKey }),

      reset: () => set(initialState),
    }),
    {
      name: QUIZ_STORAGE_KEY,
      // Use sessionStorage — progress resets when browser closes
      storage: createJSONStorage(() => {
        // SSR guard — sessionStorage not available on server
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
          }
        }
        return sessionStorage
      }),
    },
  ),
)
