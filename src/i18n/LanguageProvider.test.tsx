import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { siteContent, type SiteContent } from '../content/content.zh-CN'
import { convertValue } from './convert'
import {
  LanguageProvider,
  localeStorageKey,
  useLanguage,
} from './LanguageProvider'
import type { Locale } from './types'

vi.mock('./convert', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./convert')>()

  return {
    ...actual,
    convertValue: vi.fn(async (value: SiteContent['portal'], locale: Locale) => {
      if (locale === 'zh-TW') {
        return {
          ...value,
          hero: {
            ...value.hero,
            title: '從一項業務，理解一家銀行。',
          },
        }
      }

      return value
    }),
  }
})

function Probe() {
  const { locale, setLocale, t, pending } = useLanguage()

  return (
    <div>
      <p>locale:{locale}</p>
      <p>{pending ? '转换中' : '就绪'}</p>
      <h1>{t.portal.hero.title}</h1>
      <button type="button" onClick={() => setLocale('zh-TW')}>
        切换繁体
      </button>
      <button type="button" onClick={() => setLocale('zh-CN')}>
        切换简体
      </button>
    </div>
  )
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = ''
    vi.mocked(convertValue).mockClear()
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 128,
    })
  })

  it('uses Simplified Chinese by default', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )

    expect(screen.getByText('locale:zh-CN')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '从一项业务，理解一家银行。' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('zh-CN')
  })

  it('hydrates a stored Traditional preference and updates document language', async () => {
    localStorage.setItem(localeStorageKey, 'zh-TW')

    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: '從一項業務，理解一家銀行。' })).toBeInTheDocument(),
    )
    expect(screen.getByText('locale:zh-TW')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('zh-TW')
  })

  it('persists locale changes, preserves scroll position, and exposes pending state', async () => {
    let resolveConversion: (value: SiteContent['portal']) => void = () => undefined
    vi.mocked(convertValue).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveConversion = resolve
        }),
    )

    const user = userEvent.setup()
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )

    await user.click(screen.getByRole('button', { name: '切换繁体' }))

    expect(localStorage.getItem(localeStorageKey)).toBe('zh-TW')
    expect(document.documentElement.lang).toBe('zh-TW')
    expect(window.scrollY).toBe(128)
    expect(screen.getByText('转换中')).toBeInTheDocument()

    resolveConversion({
      ...siteContent.portal,
      hero: {
        ...siteContent.portal.hero,
        title: '從一項業務，理解一家銀行。',
      },
    })

    await waitFor(() => expect(screen.getByText('就绪')).toBeInTheDocument())
    expect(screen.getByRole('heading', { name: '從一項業務，理解一家銀行。' })).toBeInTheDocument()
  })
})
