import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const [displayContent, setDisplayContent] = useState<SiteContent>(siteContent)
  const [pending, setPending] = useState(() => readStoredLocale() === 'zh-TW')

  const setLocale = useCallback<Dispatch<SetStateAction<Locale>>>((nextLocale) => {
    setLocaleState((currentLocale) => {
      const resolvedLocale =
        typeof nextLocale === 'function' ? nextLocale(currentLocale) : nextLocale

      setPending(resolvedLocale === 'zh-TW')
      return resolvedLocale
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(localeStorageKey, locale)

    if (locale === 'zh-CN') {
      return undefined
    }

    let active = true

    convertValue(siteContent, locale)
      .then((convertedContent) => {
        if (active) {
          setDisplayContent(convertedContent)
        }
      })
      .finally(() => {
        if (active) {
          setPending(false)
        }
      })

    return () => {
      active = false
    }
  }, [locale])

  const activeContent = locale === 'zh-CN' ? siteContent : displayContent

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
