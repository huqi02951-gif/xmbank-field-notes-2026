import { useRef } from 'react'

import { useLanguage } from '../../i18n/LanguageProvider'
import type { Locale } from '../../i18n/types'

const options: Array<{ locale: Locale; label: string }> = [
  { locale: 'zh-CN', label: '简体' },
  { locale: 'zh-TW', label: '繁體' },
]

export function LanguageToggle() {
  const { locale, setLocale, pending } = useLanguage()
  const pointerStart = useRef<number | null>(null)
  const suppressClick = useRef(false)

  const selectLocale = (nextLocale: Locale) => {
    if (!suppressClick.current) setLocale(nextLocale)
  }

  const finishSwipe = (clientX: number) => {
    if (pointerStart.current === null) return
    const distance = clientX - pointerStart.current
    pointerStart.current = null

    if (Math.abs(distance) < 24) return
    suppressClick.current = true
    setLocale(distance > 0 ? 'zh-TW' : 'zh-CN')
    window.setTimeout(() => { suppressClick.current = false }, 0)
  }

  return (
    <div
      className="language-toggle"
      role="group"
      aria-label="显示语言"
      aria-busy={pending}
      data-locale={locale}
      onPointerDown={(event) => { pointerStart.current = event.clientX }}
      onPointerUp={(event) => finishSwipe(event.clientX)}
      onPointerCancel={() => { pointerStart.current = null }}
    >
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          aria-pressed={locale === option.locale}
          onClick={() => selectLocale(option.locale)}
        >
          {option.label}
        </button>
      ))}
      <span className="visually-hidden" aria-live="polite">{pending ? '正在切换文字' : ''}</span>
    </div>
  )
}
