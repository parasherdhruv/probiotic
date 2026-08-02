import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Input } from '~/components/ui/Input'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-brand-950" />
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/50 to-brand-700/20 mix-blend-overlay" />
      <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-brand-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container-app relative z-10">
        <div className="max-w-4xl mx-auto bg-surface/5 dark:bg-surface/10 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection direction="left" className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Join the inner circle.
              </h2>
              <p className="text-lg text-brand-100/80 mb-6">
                Get early access to new formulas, deep-dive science articles, and exclusive community discounts.
              </p>
              <div className="flex gap-4 items-center text-sm font-medium text-brand-200">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" /> No spam
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" /> Unsubscribe anytime
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-brand-900/50 border border-brand-500/30 rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-brand-200">Check your inbox for a welcome gift.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="relative">
                      <Input 
                        type="email" 
                        placeholder="Your email address" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-14 px-6 rounded-full focus-visible:ring-brand-400 text-lg"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="h-14 rounded-full bg-white text-brand-950 hover:bg-brand-50 text-lg font-semibold w-full sm:w-auto transition-transform active:scale-95"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Joining...' : 'Subscribe'}
                      {status !== 'loading' && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </AnimatedSection>
            
          </div>
        </div>
      </div>
    </section>
  )
}
