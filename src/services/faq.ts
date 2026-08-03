import { useQuery } from '@tanstack/react-query'

export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'Product' | 'Shipping' | 'Usage' | 'Science'
}

const MOCK_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Product',
    question: 'Are your probiotics vegan and gluten-free?',
    answer: 'Yes, our entire line of probiotics is 100% vegan, gluten-free, non-GMO, and free of major allergens including soy, dairy, and nuts.'
  },
  {
    id: 'faq-2',
    category: 'Product',
    question: 'Do I need to refrigerate my probiotics?',
    answer: 'No. We use a proprietary freeze-drying process and advanced desiccant-lined bottles that keep the strains alive and stable at room temperature.'
  },
  {
    id: 'faq-3',
    category: 'Usage',
    question: 'When is the best time to take my daily dose?',
    answer: 'We recommend taking two capsules daily, ideally first thing in the morning on an empty stomach, about 30 minutes before your first meal, to ensure maximum survivability through gastric acid.'
  },
  {
    id: 'faq-4',
    category: 'Usage',
    question: 'Can I take these with antibiotics?',
    answer: 'Yes, but we strongly advise spacing them out. Take your probiotics at least 2 hours before or after your antibiotic dose so the antibiotics do not immediately kill the beneficial strains.'
  },
  {
    id: 'faq-5',
    category: 'Science',
    question: 'What does "100% Survivability" actually mean?',
    answer: 'Most standard probiotics die in your stomach acid before they ever reach your colon. Our delayed-release capsules are engineered to bypass stomach acid completely and dissolve only once they reach the lower intestine.'
  },
  {
    id: 'faq-6',
    category: 'Shipping',
    question: 'How does your cold-shipping work?',
    answer: 'While our product is shelf-stable, extreme heat during transit can degrade CFUs. During summer months or in hot climates, we ship all orders in insulated mailers with eco-friendly ice packs to guarantee maximum potency upon arrival.'
  }
]

export function useFAQs() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return MOCK_FAQS
    }
  })
}
