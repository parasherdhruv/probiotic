import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '~/lib/api'
import type { Testimonial } from '~/types/content'

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    quote: "I've tried everything for my bloating, and this is the first probiotic that actually made a noticeable difference within a week.",
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    id: 't2',
    name: 'Marcus T.',
    quote: "As an athlete, digestion and recovery are everything. Since starting Lastly, my nutrient absorption has skyrocketed.",
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    id: 't3',
    name: 'Elena R.',
    quote: "Finally, a brand that relies on actual clinical studies instead of marketing fluff. I trust the science here.",
    rating: 4.5,
    avatarUrl: 'https://i.pravatar.cc/150?u=a048581f4e29026701d'
  },
  {
    id: 't4',
    name: 'Michael B.',
    quote: "The delayed-release capsules really work. I used to get an upset stomach from other brands, but this one is incredibly smooth and effective.",
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=b048581f4e29026702d'
  },
  {
    id: 't5',
    name: 'Jessica W.',
    quote: "My energy levels are much more consistent throughout the day. It's amazing how much gut health affects your overall mood.",
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=c048581f4e29026703d'
  },
  {
    id: 't6',
    name: 'Dr. Aaron P.',
    quote: "I recommend this formulation to my patients who are looking for a scientifically backed, strain-specific probiotic.",
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=d048581f4e29026704d'
  },
  {
    id: 't7',
    name: 'Chloe M.',
    quote: "I love the transparency. The QR code on the bottle linking straight to the third-party lab tests is a game changer for me.",
    rating: 4.5,
    avatarUrl: 'https://i.pravatar.cc/150?u=e048581f4e29026705d'
  },
  {
    id: 't8',
    name: 'Ryan K.',
    quote: "Best investment in my health this year. Period.",
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=f048581f4e29026706d'
  }
]

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      try {
        return await fetchApi<Testimonial[]>('/api/v1/testimonials')
      } catch (error) {
        console.log('Falling back to mock testimonials data:', error instanceof Error ? error.message : String(error))
        await new Promise(resolve => setTimeout(resolve, 300))
        return MOCK_TESTIMONIALS
      }
    }
  })
}
