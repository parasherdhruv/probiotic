import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useConsentStore } from '~/store/consent'
import { Button } from '~/components/ui/Button'
import { Switch } from '~/components/ui/Switch'
import { track } from '~/analytics/track'

export function CookieConsentBanner() {
  const { hasResponded, acceptAll, rejectAll, updateConsent, analytics, marketing } = useConsentStore()
  const [showDetails, setShowDetails] = useState(false)
  
  // Delay mounting banner to prevent SSR hydration flash
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {!hasResponded && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-toast border-t border-border bg-background/90 p-4 shadow-2xl backdrop-blur-md sm:bottom-4 sm:left-auto sm:right-4 sm:w-[400px] sm:rounded-2xl sm:border"
        >
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-foreground">We value your privacy</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
              </p>
            </div>

            {showDetails && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="flex flex-col gap-3 overflow-hidden text-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">Strictly Necessary</span>
                    <span className="text-xs text-muted-foreground">Required for the site to function</span>
                  </div>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">Analytics</span>
                    <span className="text-xs text-muted-foreground">Helps us improve the experience</span>
                  </div>
                  <Switch 
                    checked={analytics} 
                    onCheckedChange={(c) => updateConsent({ analytics: c })} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">Marketing</span>
                    <span className="text-xs text-muted-foreground">Used for personalized ads</span>
                  </div>
                  <Switch 
                    checked={marketing} 
                    onCheckedChange={(c) => updateConsent({ marketing: c })} 
                  />
                </div>
              </motion.div>
            )}

            <div className="flex flex-col gap-2">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => {
                  acceptAll()
                  track('consent_accepted')
                }}
              >
                Accept All
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide Details' : 'Manage'}
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => {
                    rejectAll()
                    track('consent_rejected')
                  }}
                >
                  Reject All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
