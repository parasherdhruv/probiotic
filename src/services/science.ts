import { useQuery } from '@tanstack/react-query'

export interface ClinicalStudy {
  id: string
  title: string
  journal: string
  year: number
  summary: string
  link?: string
}

export interface StrainProfile {
  id: string
  name: string
  description: string
  benefits: string[]
}

const MOCK_STUDIES: ClinicalStudy[] = [
  {
    id: 'study-1',
    title: 'Impact of Bifidobacterium longum on cortisol levels and perceived stress',
    journal: 'Journal of Neurogastroenterology',
    year: 2022,
    summary: 'A double-blind, placebo-controlled study demonstrating a 24% reduction in cortisol levels over 8 weeks.',
  },
  {
    id: 'study-2',
    title: 'Survivability of Lactobacillus acidophilus NCFM in gastric acid models',
    journal: 'Clinical Microbiome Review',
    year: 2023,
    summary: 'Demonstrated 100% survivability through stomach acid when utilizing our proprietary delayed-release capsule technology.',
  },
  {
    id: 'study-3',
    title: 'Modulation of the Gut-Brain Axis via Multi-Strain Probiotics',
    journal: 'Frontiers in Neuroscience',
    year: 2021,
    summary: 'Participants reported improved mental clarity and reduced brain fog after 30 days of consistent supplementation.',
  }
]

const MOCK_STRAINS: StrainProfile[] = [
  {
    id: 'strain-1',
    name: 'Bifidobacterium longum',
    description: 'A key strain for the gut-brain axis, known to reduce stress and anxiety.',
    benefits: ['Stress reduction', 'Mood balance', 'Cortisol regulation']
  },
  {
    id: 'strain-2',
    name: 'Lactobacillus acidophilus NCFM',
    description: 'One of the most highly researched strains for digestive comfort and nutrient absorption.',
    benefits: ['Digestive comfort', 'Nutrient absorption', 'Bloat reduction']
  },
  {
    id: 'strain-3',
    name: 'Lacticaseibacillus rhamnosus GG',
    description: 'Essential for immune support and maintaining a healthy intestinal barrier.',
    benefits: ['Immune support', 'Intestinal barrier health', 'Pathogen defense']
  }
]

export function useClinicalStudies() {
  return useQuery({
    queryKey: ['clinical-studies'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      return MOCK_STUDIES
    }
  })
}

export function useStrainProfiles() {
  return useQuery({
    queryKey: ['strain-profiles'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      return MOCK_STRAINS
    }
  })
}
