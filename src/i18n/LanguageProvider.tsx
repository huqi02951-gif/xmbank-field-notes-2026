import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

import { siteContent, type SiteContent } from '../content/content.zh-CN'
import { convertValue } from './convert'
import type { Locale } from './types'

export const localeStorageKey = 'xmbank-field-notes-locale'

interface LanguageContextValue {
  locale: Locale
  setLocale: Dispatch<SetStateAction<Locale>>
  t: SiteContent
  pending: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh-CN'
  }

  return localStorage.getItem(localeStorageKey) === 'zh-TW' ? 'zh-TW' : 'zh-CN'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)
  const [traditionalPortal, setTraditionalPortal] = useState<SiteContent['portal'] | null>(null)
  const conversionPromise = useRef<Promise<SiteContent['portal']> | null>(null)

  const prepareTraditionalPortal = useCallback(() => {
    conversionPromise.current ??= convertValue(siteContent.portal, 'zh-TW')
    return conversionPromise.current
  }, [])

  const setLocale = useCallback<Dispatch<SetStateAction<Locale>>>((nextLocale) => {
    setLocaleState((currentLocale) => {
      const resolvedLocale =
        typeof nextLocale === 'function' ? nextLocale(currentLocale) : nextLocale

      return resolvedLocale
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(localeStorageKey, locale)
  }, [locale])

  useEffect(() => {
    let active = true
    const warmConversion = () => {
      prepareTraditionalPortal()
        .then((convertedPortal) => {
          if (active) setTraditionalPortal(convertedPortal)
        })
        .catch(() => {
          conversionPromise.current = null
        })
    }

    const supportsIdleCallback = 'requestIdleCallback' in window
    const handle = supportsIdleCallback
      ? window.requestIdleCallback(warmConversion, { timeout: 1200 })
      : window.setTimeout(warmConversion, 120)

    return () => {
      active = false
      if (supportsIdleCallback) {
        window.cancelIdleCallback(handle)
      } else {
        window.clearTimeout(handle)
      }
    }
  }, [prepareTraditionalPortal])

  useEffect(() => {
    if (locale === 'zh-CN') {
      return undefined
    }

    let active = true

    prepareTraditionalPortal()
      .then((convertedPortal) => {
        if (active) {
          setTraditionalPortal(convertedPortal)
        }
      })
      .catch(() => {
        if (active) setLocaleState('zh-CN')
      })

    return () => {
      active = false
    }
  }, [locale, prepareTraditionalPortal])

  const pending = locale === 'zh-TW' && traditionalPortal === null
  const activeContent = useMemo<SiteContent>(() => {
    if (locale !== 'zh-TW' || !traditionalPortal) return siteContent
    return { ...siteContent, portal: traditionalPortal }
  }, [locale, traditionalPortal])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: activeContent,
      pending,
    }),
    [activeContent, locale, pending, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
