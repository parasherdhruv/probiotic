import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/ui/Accordion'
import { Button } from '~/components/ui/Button'
import { useFAQs, type FAQ } from '~/services/faq'
import { Mail, MessageCircle, Phone } from 'lucide-react'

const CATEGORIES = ['All', 'Product', 'Usage', 'Science', 'Shipping'] as const
type Category = typeof CATEGORIES[number]

export default function FAQRoute() {
  const { data: faqs, isLoading } = useFAQs()
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filteredFaqs = useMemo(() => {
    if (!faqs) return []
    if (activeCategory === 'All') return faqs
    return faqs.filter(faq => faq.category === activeCategory)
  }, [faqs, activeCategory])

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-app max-w-4xl">
        
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our science, your subscription, and how to get the most out of your daily dose.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'secondary'}
              className="rounded-full px-6"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </AnimatedSection>

        {/* FAQ Accordion */}
        <div className="w-full">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border-border">
                      <AccordionTrigger className="text-left text-lg font-medium hover:text-brand-500 py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No questions found in this category.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Contact CTA */}
        <AnimatedSection delay={0.3} className="mt-24 p-8 md:p-12 bg-muted rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our team of specialists is standing by to help you understand your microbiome and find the perfect routine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto rounded-full" size="lg">
              <MessageCircle className="mr-2 h-5 w-5" /> Live Chat
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto rounded-full bg-background" size="lg">
              <Mail className="mr-2 h-5 w-5" /> Email Us
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto rounded-full bg-background" size="lg">
              <Phone className="mr-2 h-5 w-5" /> Call Us
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
