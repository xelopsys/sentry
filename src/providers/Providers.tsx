'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect } from 'react'

interface ProvidersProps {
  children: React.ReactNode
  translations: any
}

// intentionally any type for translations
const TranslationsContext = createContext<any | null>(null)

// Create a client
const queryClient = new QueryClient()

export const Providers = ({ children, translations }: ProvidersProps) => {
  const searchParams = useSearchParams()
  const gclid = searchParams?.get('gclid')

  useEffect(() => {
    if (gclid) {
      localStorage.setItem('gclid', gclid)
    }
  }, [gclid])

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationsContext.Provider value={translations}>
        {children}
      </TranslationsContext.Provider>
    </QueryClientProvider>
  )
}

export const useTranslations = (key?: string) => {
  const store = useContext(TranslationsContext)

  if (!store) {
    throw new Error('Missing Provider')
  }

  // split string by dot and get nested value
  const splitKey = key ? key.split('.') : []
  if (splitKey.length > 1) {
    return splitKey.reduce((acc, cur) => {
      if (acc && acc[cur]) {
        return acc[cur]
      }
      return ''
    }, store)
  }

  if (key && store[key]) {
    return store[key]
  }

  return store
}
