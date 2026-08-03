import { Link, isRouteErrorResponse, useRouteError } from 'react-router'
import { BRAND_NAME } from '~/constants'
import { Button } from '~/components/ui/Button'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Microscope, ArrowRight } from 'lucide-react'

// You can use this route as both the 404 catch-all AND a general error boundary.

export function meta() {
  return [
    { title: `Not Found | ${BRAND_NAME}` },
    { name: "description", content: "The page you're looking for doesn't exist." },
  ]
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-20 px-4 bg-surface">
      <div className="max-w-2xl mx-auto text-center">
        
        <AnimatedSection direction="down">
          <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-200 dark:border-brand-800">
            <Microscope className="w-12 h-12 text-brand-500" />
          </div>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Strain Not Found</h2>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-lg text-text-muted mb-12 max-w-lg mx-auto">
            It looks like this page has been lost to the microbiome. Let's get you back to a balanced state.
          </p>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full w-full sm:w-auto" asChild>
              <Link to="/">Return Home</Link>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full w-full sm:w-auto" asChild>
              <Link to="/products">Browse Formulations</Link>
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full w-full sm:w-auto gap-2" asChild>
              <Link to="/find-your-routine">Take the Quiz <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </AnimatedSection>
        
      </div>
    </div>
  )
}

// Optional ErrorBoundary for React Router v7
export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-text-muted mb-8 max-w-md">
        An unexpected error occurred. Our team has been notified.
      </p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  )
}
