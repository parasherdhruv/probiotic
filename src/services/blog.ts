import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '~/lib/api'
import type { BlogPost } from '~/types/content'

const MOCK_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'the-gut-brain-connection',
    title: 'The Gut-Brain Axis: How Microbiome Health Affects Mood',
    excerpt: 'Emerging clinical data suggests that the gut microbiome plays a foundational role in producing neurotransmitters like serotonin. Here is what the latest science reveals.',
    date: 'August 12, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    category: 'Science',
    author: 'Dr. Sarah Jenkins, PhD',
    readTime: '6 min read',
    content: [
      'The human gut is often referred to as the "second brain." This isn\'t just a metaphor; it\'s a physiological reality driven by the enteric nervous system, which consists of over 100 million nerve cells lining your gastrointestinal tract.',
      'Recent clinical trials have demonstrated that certain probiotic strains can directly influence the production of neurotransmitters. In fact, an estimated 90% of the body\'s serotonin is produced in the digestive tract.',
      'When your microbiome is balanced, these chemical signals travel efficiently via the vagus nerve to the brain, supporting mood stability, focus, and even sleep architecture.',
      'However, dysbiosis—an imbalance in gut bacteria caused by stress, poor diet, or antibiotics—can disrupt this communication pathway, potentially leading to increased anxiety and cognitive fog.',
      'By targeted supplementation with clinically backed strains, you can help restore this balance and support your foundational mental well-being from the inside out.'
    ]
  },
  {
    id: 'b2',
    slug: 'athletic-performance-recovery',
    title: 'Accelerating Athletic Recovery with Probiotics',
    excerpt: 'Can optimizing your gut flora improve your VO2 max and reduce DOMS? We break down the clinical studies on probiotics in sports nutrition.',
    date: 'July 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=800',
    category: 'Fitness',
    author: 'Marcus Thorne, CSCS',
    readTime: '4 min read',
    content: [
      'For decades, sports nutrition has focused heavily on macronutrients—protein for repair, carbohydrates for glycogen replenishment. But a growing body of research is shifting the focus to the microbiome.',
      'Intense exercise induces physical stress that can temporarily increase intestinal permeability (often called "leaky gut"). This allows endotoxins to enter the bloodstream, triggering systemic inflammation and delaying recovery.',
      'Specific strains of probiotics, such as those found in our Active Recovery formulation, have been shown to fortify the intestinal barrier, mitigating this exercise-induced inflammation.',
      'Furthermore, a healthy gut microbiome enhances the absorption of amino acids from dietary protein, ensuring your muscles get the building blocks they need exactly when they need them.',
      'Whether you are a weekend warrior or a competitive athlete, integrating a targeted probiotic into your routine could be the missing link in your recovery protocol.'
    ]
  },
  {
    id: 'b3',
    slug: 'plant-based-diets-microbiome',
    title: 'Why Plant-Based Diets Thrive on Precision Strains',
    excerpt: 'A vegan diet provides abundant prebiotic fiber, but lacks certain naturally occurring probiotic cultures. Here is how to bridge the gap.',
    date: 'July 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: 'Nutrition',
    author: 'Elena Rostova, RD',
    readTime: '5 min read',
    content: [
      'Adopting a plant-based diet is one of the most effective ways to increase your intake of prebiotic fiber—the "food" that beneficial gut bacteria need to thrive.',
      'However, while prebiotics are abundant in a vegan lifestyle, acquiring diverse live probiotic cultures can be more challenging. Traditional fermented foods like dairy kefir and certain yogurts are off the table.',
      'While fermented vegetables (kimchi, sauerkraut) and kombucha offer some benefits, their strain survivability through stomach acid is often unpredictable.',
      'This is where precision, targeted supplementation becomes crucial for the plant-based athlete or wellness enthusiast. Formulations housed in delayed-release, vegan-certified capsules ensure that clinically effective doses reach the lower intestine intact.',
      'By pairing your high-fiber plant-based meals with a resilient probiotic, you create the ultimate symbiotic environment for robust gut health.'
    ]
  },
  {
    id: 'b4',
    slug: 'understanding-cfus',
    title: 'CFUs Explained: Why More Isn\'t Always Better',
    excerpt: 'Demystifying Colony Forming Units. Learn why strain specificity and survivability matter far more than sheer numbers on the bottle.',
    date: 'June 30, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
    category: 'Science',
    author: 'Dr. Sarah Jenkins, PhD',
    readTime: '7 min read',
    content: [
      'Walk down any supplement aisle, and you\'ll see bottles boasting 50, 100, or even 200 Billion CFUs (Colony Forming Units). The marketing implication is simple: higher numbers equal a better product. But the science tells a different story.',
      'CFU count only measures the number of live organisms at the time of manufacture. It tells you nothing about whether those organisms will survive the harsh, highly acidic environment of your stomach.',
      'Furthermore, the benefits of probiotics are highly strain-specific. 100 billion CFUs of a generic, unstudied strain will do far less for your health than 5 billion CFUs of a clinically validated strain proven to adhere to the intestinal wall.',
      'Our approach prioritizes survivability over staggering initial counts. By utilizing specialized delivery technologies and shelf-stable strains, we guarantee that the effective dose printed on the label actually reaches your microbiome.',
      'When choosing a formulation, always look for clinical backing and delivery mechanisms, rather than simply hunting for the highest CFU count.'
    ]
  },
  {
    id: 'b5',
    slug: 'building-our-new-facility',
    title: 'Inside the Lab: Our Commitment to Purity',
    excerpt: 'Take a look behind the scenes at our new state-of-the-art facility and our rigorous third-party testing protocols.',
    date: 'June 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800',
    category: 'Company',
    author: 'David Chen, Founder',
    readTime: '3 min read',
    content: [
      'Transparency is the cornerstone of our brand. When we set out to create the world\'s most effective precision formulations, we knew we couldn\'t rely on standard contract manufacturing.',
      'That\'s why we built our own state-of-the-art, climate-controlled facility. From the moment the raw strains arrive to the final bottling process, every step is rigorously monitored to prevent cross-contamination and ensure maximum viability.',
      'We also believe that trust must be earned through verification. Every single batch we produce undergoes independent third-party testing for identity, potency, and purity.',
      'Our lab reports are openly available, ensuring that what\'s on the label is exactly what\'s in the bottle—nothing more, nothing less.',
      'Thank you for joining us on this journey to elevate the standard of wellness.'
    ]
  }
]

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    return await fetchApi<BlogPost[]>('/api/v1/posts')
  } catch (error) {
    console.log('Falling back to mock blog posts data:', error instanceof Error ? error.message : String(error))
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 400))
    return MOCK_POSTS
  }
}

export function useBlogPosts(initialData?: BlogPost[]) {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchBlogPosts,
    initialData,
  })
}
