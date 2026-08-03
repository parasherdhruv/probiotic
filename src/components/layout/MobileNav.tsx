import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Menu, X, ShoppingBag } from 'lucide-react'
import { cn } from '~/lib/cn'
import { useUIStore } from '~/store/ui'
import { Button } from '~/components/ui/Button'
import { track } from '~/analytics/track'

export function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useUIStore()

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-modal bg-background/80 backdrop-blur-md lg:hidden"
        >
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 right-0 top-0 w-[80vw] max-w-[320px] border-l border-border bg-background p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-8">
              <span className="font-semibold text-brand-500">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileNav}
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 text-lg font-medium">
                <Link
                  to="/products"
                  onClick={closeMobileNav}
                  className="hover:text-brand-500 transition-colors"
                >
                  Products
                </Link>
                <Link
                  to="/compare"
                  onClick={closeMobileNav}
                  className="hover:text-brand-500 transition-colors"
                >
                  Compare
                </Link>
                <Link
                  to="/science"
                  onClick={closeMobileNav}
                  className="hover:text-brand-500 transition-colors"
                >
                  Science
                </Link>
                <Link
                  to="/benefits"
                  onClick={closeMobileNav}
                  className="hover:text-brand-500 transition-colors"
                >
                  Benefits
                </Link>
                <Link
                  to="/faq"
                  onClick={closeMobileNav}
                  className="hover:text-brand-500 transition-colors"
                >
                  FAQ
                </Link>
              </div>

              <div className="h-px w-full bg-border" />

              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  className="w-full justify-start"
                  onClick={() => {
                    closeMobileNav()
                    track('nav_link_clicked', { link: 'find_routine_mobile' })
                  }}
                >
                  <Link to="/find-your-routine">Find Your Routine</Link>
                </Button>
                <Link
                  to="/login"
                  onClick={closeMobileNav}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
