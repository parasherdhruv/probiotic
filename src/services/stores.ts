import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '~/lib/api'

export interface Store {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
  hours: string
  type: 'premium' | 'standard'
  phone: string
}

const MOCK_STORES: Store[] = [
  {
    id: 's1',
    name: 'Erewhon Market - SoHo',
    address: '123 Prince St',
    city: 'New York',
    state: 'NY',
    zip: '10012',
    lat: 40.7251,
    lng: -74.0003,
    hours: '7am - 10pm Daily',
    type: 'premium',
    phone: '(212) 555-0199'
  },
  {
    id: 's2',
    name: 'Whole Foods Market - Tribeca',
    address: '270 Greenwich St',
    city: 'New York',
    state: 'NY',
    zip: '10007',
    lat: 40.7153,
    lng: -74.0113,
    hours: '8am - 9pm Daily',
    type: 'standard',
    phone: '(212) 555-0188'
  },
  {
    id: 's3',
    name: 'The Alchemist Pharmacy',
    address: '45 E 20th St',
    city: 'New York',
    state: 'NY',
    zip: '10003',
    lat: 40.7388,
    lng: -73.9890,
    hours: '9am - 7pm (Mon-Sat)',
    type: 'premium',
    phone: '(212) 555-0177'
  },
  {
    id: 's4',
    name: 'Naturale - West Village',
    address: '89 Christopher St',
    city: 'New York',
    state: 'NY',
    zip: '10014',
    lat: 40.7335,
    lng: -74.0028,
    hours: '8am - 8pm Daily',
    type: 'premium',
    phone: '(212) 555-0166'
  },
  {
    id: 's5',
    name: 'Equinox Shop - Hudson Yards',
    address: '32 Hudson Yards',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    lat: 40.7533,
    lng: -74.0016,
    hours: '6am - 10pm (Mon-Fri)',
    type: 'premium',
    phone: '(212) 555-0155'
  }
]

export async function fetchStores(): Promise<Store[]> {
  try {
    return await fetchApi<Store[]>('/api/v1/stores')
  } catch (error) {
    console.log('Falling back to mock stores data:', error instanceof Error ? error.message : String(error))
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_STORES
  }
}

export function useStores(initialData?: Store[]) {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
    initialData
  })
}
