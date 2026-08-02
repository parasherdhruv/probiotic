import { Link } from 'react-router'
import { BRAND_NAME, BRAND_EMAIL, BRAND_PHONE } from '~/constants'
import { Button } from '~/components/ui/Button'
import { Input } from '~/components/ui/Input'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background pt-16">
      <div className="container-app">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Brand & Newsletter */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-glow">
                <span className="font-bold leading-none">L</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                {BRAND_NAME}
              </span>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Premium probiotics crafted for gut health, immunity, and daily wellness. Scientifically formulated. Designed for your lifestyle.
            </p>
            <div className="mt-4 flex max-w-sm flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">Join our newsletter</span>
              <form 
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  // stub: handle subscribe
                }}
              >
                <Input type="email" placeholder="Your email" required className="bg-muted" />
                <Button type="submit" variant="secondary">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Explore</h4>
            <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/products" className="hover:text-brand-500 transition-colors">Products</Link>
              <Link to="/science" className="hover:text-brand-500 transition-colors">Science & Clinicals</Link>
              <Link to="/benefits" className="hover:text-brand-500 transition-colors">Benefits</Link>
              <Link to="/find-your-routine" className="hover:text-brand-500 transition-colors">Quiz</Link>
              <Link to="/blog" className="hover:text-brand-500 transition-colors">Journal</Link>
            </nav>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link>
              <Link to="/faq" className="hover:text-brand-500 transition-colors">FAQ</Link>
              <Link to="/stores" className="hover:text-brand-500 transition-colors">Store Locator</Link>
              <Link to="/contact" className="hover:text-brand-500 transition-colors">Contact</Link>
            </nav>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
