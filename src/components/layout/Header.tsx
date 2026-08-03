import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Search, Menu, ShoppingBag } from 'lucide-react'
import { cn } from '~/lib/cn'
import { BRAND_NAME } from '~/constants'
import { useUIStore } from '~/store/ui'
import { Button } from '~/components/ui/Button'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from './ThemeToggle'
import { track } from '~/analytics/track'

export function Header() {
  const { toggleMobileNav } = useUIStore()
  const location = useLocation()
  
  // Track scroll for sticky compression effect
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Init
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'w-full transition-all duration-300',
          isScrolled 
            ? 'bg-background/80 py-3 shadow-sm backdrop-blur-md dark:bg-background/90' 
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-app grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          
          {/* Logo (Left aligned) */}
          <div className="flex justify-start">
            <Link 
              to="/" 
              className="relative z-10 flex items-center gap-2 group"
              onClick={() => track('nav_link_clicked', { link: 'logo' })}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-glow transition-transform group-hover:scale-105">
                <span className="font-bold leading-none">L</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-brand-500">
                {BRAND_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Nav (Perfectly Centered) */}
          <nav className="hidden lg:flex items-center justify-center gap-8">
            {['Products', 'Compare', 'Science', 'Benefits', 'FAQ'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                className="relative text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions (Right aligned) */}
          <div className="flex items-center justify-end gap-2 lg:gap-4">
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <div className="h-5 w-px bg-border mx-2"></div>
              <Button variant="ghost" size="icon" aria-label="Search" className="hover:bg-accent-100 dark:hover:bg-neutral-800" asChild>
                <Link to="/search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Cart" className="hover:bg-accent-100 dark:hover:bg-neutral-800" asChild>
                <Link to="/products">
                  <ShoppingBag className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                className="ml-2 rounded-full px-6 shadow-md hover:shadow-lg transition-all"
                onClick={() => track('nav_link_clicked', { link: 'find_routine' })}
              >
                <Link to="/find-your-routine">Find Your Routine</Link>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileNav}
              aria-label="Open navigation"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Renders outside the sticky flow */}
      <MobileNav />
    </>
  )
}
