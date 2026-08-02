import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router'
import { useUIStore } from '~/store/ui'

export function AnnouncementBar() {
  const { isAnnouncementDismissed, dismissAnnouncement } = useUIStore()

  return (
    <AnimatePresence>
      {!isAnnouncementDismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-sticky overflow-hidden bg-brand-500 text-white"
        >
          <div className="container-app flex min-h-10 items-center justify-center py-2 text-center text-sm font-medium">
            <p>
              Free shipping on all orders over ₹999.{' '}
              <Link to="/products" className="underline underline-offset-2 hover:text-brand-100">
                Shop now
              </Link>
            </p>
            <button
              onClick={dismissAnnouncement}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
