import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/ui/Accordion'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const HOME_FAQS = [
  {
    question: "Do these need to be refrigerated?",
    answer: "No. Our capsules use a specialized desiccant-lined vial and freeze-dried strains, ensuring they remain shelf-stable at room temperature for up to 18 months."
  },
  {
    question: "When should I take my daily dose?",
    answer: "For optimal survivability, we recommend taking your probiotics first thing in the morning on an empty stomach, about 30 minutes before your first meal."
  },
  {
    question: "How long until I feel a difference?",
    answer: "Everyone's microbiome is different. Some report improved digestion within 3-5 days. However, clinical studies show the most significant systemic benefits emerge after 4-6 weeks of consistent daily use."
  },
  {
    question: "Is it safe to take with other supplements?",
    answer: "Yes, our probiotics are safe to take alongside most standard vitamins and supplements. If you are taking antibiotics, we recommend spacing out your probiotic dose by at least 2 hours."
  }
]

export function FAQPreview() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-app max-w-4xl">
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Common questions.
          </h2>
          <p className="text-xl text-text-muted">
            The science is complex, but the answers don't have to be.
          </p>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.2} className="mb-12">
          <Accordion type="single" collapsible className="w-full">
            {HOME_FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-lg md:text-xl font-medium hover:text-brand-600 transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-muted text-base md:text-lg leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
        
        <div className="text-center">
          <Button asChild variant="secondary" size="lg">
            <Link to="/faq">
              Read all FAQs <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
