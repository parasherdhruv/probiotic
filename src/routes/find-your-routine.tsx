import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useQuizStore, type QuizStep } from '~/store/quizStore'
import { Button } from '~/components/ui/Button'
import { BRAND_NAME } from '~/constants'
import { ArrowLeft, CheckCircle2, ChevronRight, FlaskConical, Target, HeartPulse, Activity } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { AnimatedSection } from '~/components/motion/AnimatedSection'

// --- Mock Data ---
const GOALS = [
  { id: 'digestion', label: 'Digestive Harmony', icon: FlaskConical, desc: 'Reduce bloating and optimize gut health.' },
  { id: 'immunity', label: 'Immune Defense', icon: Target, desc: 'Strengthen your body’s natural defenses.' },
  { id: 'fitness', label: 'Active Recovery', icon: Activity, desc: 'Support muscle recovery and energy levels.' },
  { id: 'general', label: 'General Wellness', icon: HeartPulse, desc: 'A daily foundation for overall health.' }
]

const DIETS = [
  { id: 'none', label: 'No Restrictions' },
  { id: 'vegan', label: 'Vegan / Plant-Based' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'keto', label: 'Keto / Low-Carb' }
]

const AGES = [
  { id: '18-35', label: '18 - 35' },
  { id: '36-50', label: '36 - 50' },
  { id: '51+', label: '51+' }
]

// --- Main Route Component ---
export default function FindYourRoutineRoute() {
  const { step, setStep, setAnswer, answers, reset, getRecommendation } = useQuizStore()
  const navigate = useNavigate()

  // Reset quiz on unmount or initial mount
  useEffect(() => {
    reset()
    return () => reset()
  }, [reset])

  // Progress calculation
  const steps: QuizStep[] = ['intro', 'goal', 'diet', 'age', 'analyzing', 'result']
  const progressPercent = Math.max(0, (steps.indexOf(step) / (steps.length - 2)) * 100)

  // Handlers
  const handleNext = (nextStep: QuizStep) => setStep(nextStep)
  const handleBack = (prevStep: QuizStep) => setStep(prevStep)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Quiz Header */}
      <header className="fixed top-0 inset-x-0 h-20 bg-background/80 backdrop-blur-md border-b border-border z-50 flex items-center px-6">
        <div className="flex-1">
          {step !== 'intro' && step !== 'analyzing' && step !== 'result' && (
            <button 
              onClick={() => {
                if (step === 'goal') handleBack('intro')
                if (step === 'diet') handleBack('goal')
                if (step === 'age') handleBack('diet')
              }}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <div className="text-xl font-bold tracking-tight text-foreground cursor-pointer" onClick={() => navigate('/')}>
          {BRAND_NAME}.
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            {step === 'intro' ? 'Assessment' : 
             step === 'goal' ? 'Step 1 of 3' : 
             step === 'diet' ? 'Step 2 of 3' : 
             step === 'age' ? 'Step 3 of 3' : 
             step === 'analyzing' ? 'Analyzing' : 'Your Match'}
          </div>
        </div>
        
        <div className="flex-1 flex justify-end">
          <Button variant="ghost" asChild>
            <Link to="/">Exit</Link>
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      {step !== 'intro' && step !== 'analyzing' && step !== 'result' && (
        <div className="fixed top-20 inset-x-0 h-1.5 bg-muted z-50">
          <motion.div 
            className="h-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <IntroStep key="intro" onStart={() => handleNext('goal')} />
          )}
          {step === 'goal' && (
            <GoalStep 
              key="goal" 
              value={answers.goal} 
              onSelect={(val) => { setAnswer('goal', val); handleNext('diet') }} 
            />
          )}
          {step === 'diet' && (
            <DietStep 
              key="diet" 
              value={answers.diet} 
              onSelect={(val) => { setAnswer('diet', val); handleNext('age') }} 
            />
          )}
          {step === 'age' && (
            <AgeStep 
              key="age" 
              value={answers.age} 
              onSelect={(val) => { 
                setAnswer('age', val) 
                handleNext('analyzing')
                // Simulate network/analysis delay
                setTimeout(() => handleNext('result'), 2500)
              }} 
            />
          )}
          {step === 'analyzing' && (
            <AnalyzingStep key="analyzing" />
          )}
          {step === 'result' && (
            <ResultStep key="result" recommendation={getRecommendation()} answers={answers} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

// --- Step Components ---

const slideVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit" className="max-w-xl text-center w-full">
      <AnimatedSection>
        <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-brand-100 dark:border-brand-800">
          <FlaskConical className="w-8 h-8 text-brand-600 dark:text-brand-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Discover your precision formulation.</h1>
        <p className="text-xl text-muted-foreground mb-10 text-pretty">
          Answer 3 quick questions about your body and lifestyle to get a scientifically backed probiotic recommendation.
        </p>
        <Button size="lg" className="h-14 px-10 text-lg rounded-full" onClick={onStart}>
          Start Assessment <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </AnimatedSection>
    </motion.div>
  )
}

function GoalStep({ value, onSelect }: { value?: string, onSelect: (val: string) => void }) {
  return (
    <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit" className="max-w-2xl w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">What is your primary health goal?</h2>
        <p className="text-muted-foreground">Select the area you want to focus on most.</p>
      </div>
      <motion.div variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GOALS.map((goal) => (
          <motion.button
            variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
            key={goal.id}
            onClick={() => onSelect(goal.id)}
            className={`flex flex-col text-left p-6 rounded-2xl border-2 transition-all ${
              value === goal.id 
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-brand-500/20 shadow-lg scale-[1.02]' 
                : 'border-border bg-card hover:border-brand-300 dark:hover:border-brand-700 hover:bg-muted'
            }`}
          >
            <goal.icon className={`w-8 h-8 mb-4 ${value === goal.id ? 'text-brand-600 dark:text-brand-400' : 'text-muted-foreground'}`} />
            <span className="font-bold text-lg mb-1">{goal.label}</span>
            <span className="text-sm text-muted-foreground">{goal.desc}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

function DietStep({ value, onSelect }: { value?: string, onSelect: (val: string) => void }) {
  return (
    <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit" className="max-w-lg w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Any dietary restrictions?</h2>
        <p className="text-muted-foreground">All our formulations are vegan, but this helps us tailor advice.</p>
      </div>
      <motion.div variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }} className="flex flex-col gap-3">
        {DIETS.map((diet) => (
          <motion.button
            variants={{ initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } }}
            key={diet.id}
            onClick={() => onSelect(diet.id)}
            className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
              value === diet.id 
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                : 'border-border bg-card hover:border-brand-300 dark:hover:border-brand-700 hover:bg-muted text-foreground'
            }`}
          >
            <span className="font-semibold text-lg">{diet.label}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              value === diet.id ? 'border-brand-500 bg-brand-500' : 'border-muted-foreground/30'
            }`}>
              {value === diet.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

function AgeStep({ value, onSelect }: { value?: string, onSelect: (val: string) => void }) {
  return (
    <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit" className="max-w-lg w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">What is your age group?</h2>
        <p className="text-muted-foreground">Microbiome needs shift as we age.</p>
      </div>
      <motion.div variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }} className="flex flex-col gap-3">
        {AGES.map((age) => (
          <motion.button
            variants={{ initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } }}
            key={age.id}
            onClick={() => onSelect(age.id)}
            className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
              value === age.id 
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                : 'border-border bg-card hover:border-brand-300 dark:hover:border-brand-700 hover:bg-muted text-foreground'
            }`}
          >
            <span className="font-semibold text-lg">{age.label}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              value === age.id ? 'border-brand-500 bg-brand-500' : 'border-muted-foreground/30'
            }`}>
              {value === age.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

function AnalyzingStep() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FlaskConical className="w-8 h-8 text-brand-500 animate-pulse" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">Analyzing your profile...</h2>
      <p className="text-muted-foreground">Matching with clinical data points.</p>
    </motion.div>
  )
}

function ResultStep({ recommendation, answers }: { recommendation: string, answers: any }) {
  // Mock product mapping based on the recommendation ID
  const product = {
    'daily-core': { name: 'Daily Core', tag: 'Digestive Foundation', color: 'brand' },
    'immune-defense': { name: 'Immune Defense', tag: 'Clinical Immunity', color: 'science' },
    'active-recovery': { name: 'Active Recovery', tag: 'Athletic Performance', color: 'fitness' }
  }[recommendation] || { name: 'Daily Core', tag: 'Digestive Foundation', color: 'brand' }

  const goalText = GOALS.find(g => g.id === answers.goal)?.label || 'your health goals'

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }} 
      className="max-w-3xl w-full text-center"
    >
      <AnimatedSection>
        <div className="inline-flex items-center rounded-full bg-success/10 px-4 py-1.5 text-sm font-medium text-success mb-8">
          <CheckCircle2 className="w-4 h-4 mr-2" /> Match Found
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          Your precision formulation is <br/>
          <span className="text-brand-600 dark:text-brand-400">{product.name}</span>.
        </h2>

        <div className="bg-card border border-border p-8 rounded-3xl max-w-lg mx-auto shadow-xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
          
          <div className="relative z-10">
            <div className="w-32 h-48 bg-muted rounded-xl mx-auto mb-6 flex items-center justify-center shadow-inner">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">[Product Render]</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-muted-foreground font-medium mb-6">{product.tag}</p>
            
            <div className="text-left bg-muted/50 rounded-xl p-4 mb-8">
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3">Why this is right for you:</h4>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-3 text-brand-500 shrink-0 mt-0.5" /> 
                  <span>Engineered specifically to support <strong>{goalText}</strong>.</span>
                </li>
                {answers.diet !== 'none' && (
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-brand-500 shrink-0 mt-0.5" /> 
                    <span>100% compliant with your <strong>{DIETS.find(d => d.id === answers.diet)?.label}</strong> lifestyle.</span>
                  </li>
                )}
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-3 text-brand-500 shrink-0 mt-0.5" /> 
                  <span>Optimized strain dosages for ages <strong>{answers.age}</strong>.</span>
                </li>
              </ul>
            </div>

            <Button size="lg" className="w-full h-14 rounded-xl text-lg">
              Add to Cart — $49
            </Button>
          </div>
        </div>

        <Button variant="ghost" asChild>
          <Link to="/">Return to Homepage</Link>
        </Button>
      </AnimatedSection>
    </motion.div>
  )
}
