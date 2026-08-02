import { useState, useRef, useEffect } from 'react'
import type { Route } from './+types/stores'
import { BRAND_NAME } from '~/constants'
import { fetchStores, useStores, type Store } from '~/services/stores'
import { Button } from '~/components/ui/Button'
import { Badge } from '~/components/ui/Badge'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react'
// @ts-ignore
import Map, { Marker, Popup } from 'react-map-gl'
// @ts-ignore
import type { MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { motion, AnimatePresence } from 'motion/react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Store Locator | ${BRAND_NAME}` },
    { name: "description", content: "Find our precision probiotic formulations at a premium retail partner near you." },
  ]
}

export async function loader() {
  const stores = await fetchStores()
  return { stores }
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

export default function StoreLocator({ loaderData }: Route.ComponentProps) {
  const { data: stores } = useStores(loaderData.stores)
  const mapRef = useRef<MapRef>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  
  // NYC Coordinates
  const initialViewState = {
    longitude: -73.9900,
    latitude: 40.7300,
    zoom: 12
  }
  
  const filteredStores = stores?.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    store.zip.includes(searchQuery)
  ) || []

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store)
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [store.lng, store.lat],
        zoom: 15,
        duration: 1500
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-surface">
      {/* Header for mobile */}
      <div className="lg:hidden p-6 bg-card border-b border-border">
        <h1 className="text-3xl font-bold mb-2">Find a Store</h1>
        <p className="text-text-muted text-sm">Discover our formulations in premium retail locations.</p>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Panel: Store List */}
        <div className="w-full lg:w-[450px] shrink-0 bg-card flex flex-col h-[50vh] lg:h-full border-r border-border/50 z-10 shadow-xl lg:shadow-none">
          
          <div className="p-6 border-b border-border/50 bg-card sticky top-0 z-20">
            <div className="hidden lg:block mb-6">
              <h1 className="text-3xl font-bold mb-2">Find a Store</h1>
              <p className="text-text-muted text-sm text-balance">Discover our formulations in premium retail locations.</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input 
                type="text"
                placeholder="Search by name or zip..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredStores.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No locations found matching your search.</p>
              </div>
            ) : (
              filteredStores.map((store, i) => (
                <AnimatedSection key={store.id} direction="up" delay={i * 0.05}>
                  <div 
                    onClick={() => handleStoreClick(store)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      selectedStore?.id === store.id 
                        ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/20 shadow-md ring-1 ring-brand-500' 
                        : 'border-border/50 bg-surface hover:border-brand-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg leading-tight pr-4">{store.name}</h3>
                      {store.type === 'premium' && (
                        <Badge variant="outline" className="bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300 border-none shrink-0">
                          Premium
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-text-muted">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{store.address}<br/>{store.city}, {store.state} {store.zip}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{store.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>{store.phone}</span>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {selectedStore?.id === store.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-border"
                        >
                          <Button className="w-full rounded-full gap-2" variant="ghost">
                            <Navigation className="w-4 h-4" /> Get Directions
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Map */}
        <div className="w-full flex-1 h-[50vh] lg:h-full relative bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
          {!MAPBOX_TOKEN ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-surface border-l border-border/50">
              <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/20 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-10 h-10 text-brand-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Map Unavailable</h2>
              <p className="text-text-muted max-w-md">
                The map cannot be loaded because the Mapbox access token is missing. Please add `VITE_MAPBOX_ACCESS_TOKEN` to your `.env` file.
              </p>
              <div className="mt-8 p-6 bg-card border border-border rounded-2xl max-w-sm text-left">
                <p className="text-sm font-semibold mb-2">Simulated Location:</p>
                <p className="text-sm text-text-muted">{selectedStore ? selectedStore.name : 'Select a store from the list to view details.'}</p>
              </div>
            </div>
          ) : (
            // @ts-ignore
            <Map
              ref={mapRef}
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={initialViewState}
              mapStyle="mapbox://styles/mapbox/light-v11"
              reuseMaps
              style={{ width: '100%', height: '100%' }}
            >
              {filteredStores.map(store => (
                <Marker 
                  key={store.id} 
                  longitude={store.lng} 
                  latitude={store.lat}
                  anchor="bottom"
                  onClick={(e: any) => {
                    e.originalEvent.stopPropagation()
                    handleStoreClick(store)
                  }}
                >
                  <div className={`cursor-pointer group relative -translate-y-2`}>
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full blur-sm bg-black/30 transition-all ${selectedStore?.id === store.id ? 'w-6 opacity-50' : 'opacity-30 group-hover:w-6'}`} />
                    <MapPin className={`w-10 h-10 transition-all duration-300 drop-shadow-lg ${
                      selectedStore?.id === store.id 
                        ? 'text-brand-600 scale-125 -translate-y-2' 
                        : 'text-neutral-800 hover:text-brand-500 hover:scale-110 hover:-translate-y-1'
                    }`} />
                  </div>
                </Marker>
              ))}
              
              {selectedStore && (
                <Popup
                  longitude={selectedStore.lng}
                  latitude={selectedStore.lat}
                  anchor="bottom"
                  offset={[0, -50]}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setSelectedStore(null)}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-base mb-1">{selectedStore.name}</h3>
                    <p className="text-xs text-text-muted mb-2">{selectedStore.address}</p>
                    <Badge variant="outline" className="text-[10px] bg-brand-50 text-brand-700">
                      {selectedStore.type === 'premium' ? 'Premium Partner' : 'Retail Partner'}
                    </Badge>
                  </div>
                </Popup>
              )}
            </Map>
          )}
        </div>
        
      </div>
    </div>
  )
}
