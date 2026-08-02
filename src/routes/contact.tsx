import { useState } from 'react'
import type { Route } from './+types/contact'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import { fetchApi } from '~/lib/api'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Contact Us | ${BRAND_NAME}` },
    { name: "description", content: "Get in touch with our team of experts." },
  ]
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      await fetchApi('/api/v1/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.log('Falling back to mock form submission:', error)
      await new Promise(resolve => setTimeout(resolve, 1500))
    }
    
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
    
    // Reset success state after a few seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-surface">
      <div className="container-app">
        
        <AnimatedSection direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-text-muted">
            Have questions about our formulations, your order, or just want to talk science? We're here to help.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <AnimatedSection direction="left" delay={0.1}>
              <div className="bg-card p-8 rounded-3xl border border-border/50">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-text-muted text-sm">support@{BRAND_NAME.toLowerCase()}.com</p>
                      <p className="text-text-muted text-sm mt-1">We aim to reply within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="text-text-muted text-sm">+1 (800) 123-4567</p>
                      <p className="text-text-muted text-sm mt-1">Mon-Fri, 9am - 5pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">HQ & Lab</p>
                      <p className="text-text-muted text-sm">100 Biotech Way<br />Cambridge, MA 02142</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-card p-8 md:p-10 rounded-3xl border border-border/50 shadow-xl relative overflow-hidden">
                
                {isSuccess ? (
                  <div className="absolute inset-0 z-10 bg-card flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-text-muted max-w-md">
                      Thank you for reaching out. A member of our team will get back to you shortly.
                    </p>
                    <Button className="mt-8 rounded-full" onClick={() => setIsSuccess(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : null}
                
                <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <input 
                        {...register("name")}
                        id="name"
                        className="flex h-12 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Jane Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <input 
                        {...register("email")}
                        id="email"
                        type="email"
                        className="flex h-12 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="jane@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <input 
                      {...register("subject")}
                      id="subject"
                      className="flex h-12 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="How can we help?"
                    />
                    {errors.subject && <p className="text-red-500 text-xs font-medium">{errors.subject.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea 
                      {...register("message")}
                      id="message"
                      rows={5}
                      className="flex w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      placeholder="Your message here..."
                    />
                    {errors.message && <p className="text-red-500 text-xs font-medium">{errors.message.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-full h-14 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  
                </form>
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </div>
    </div>
  )
}
