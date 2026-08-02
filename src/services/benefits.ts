import { useQuery } from '@tanstack/react-query'
import type { Benefit } from '~/types/content'

// Mock Data
const MOCK_BENEFITS: Benefit[] = [
  {
    id: 'b1',
    title: 'Digestive Harmony',
    description: 'Clinically studied strains that help reduce bloating and maintain regularity.',
    icon: 'Activity'
  },
  {
    id: 'b2',
    title: 'Immune Support',
    description: '70% of your immune system is in your gut. Our formula supports natural defenses.',
    icon: 'Shield'
  },
  {
    id: 'b3',
    title: 'Energy Metabolism',
    description: 'Optimized nutrient absorption to keep your energy levels steady throughout the day.',
    icon: 'Zap'
  },
  {
    id: 'b4',
    title: 'Mental Clarity',
    description: 'Support the gut-brain axis for improved focus and reduced brain fog.',
    icon: 'Brain'
  }
]

export function useBenefits() {
  return useQuery({
    queryKey: ['benefits'],
    queryFn: async () => {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 400))
      return MOCK_BENEFITS
    }
  })
}
