import { useLanguage } from '../../i18n/LanguageProvider'
import type { Locale } from '../../i18n/types'

const options: Array<{ locale: Locale; label: string }> = [
  { locale: 'zh-CN', label: '简体' },
  { locale: 'zh-TW', label: '繁體' },
]

export function LanguageToggle() {
  const { locale, setLocale, pending } = useLanguage()

  return (
    <div className="language-toggle" aria-label="显示语言">
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          aria-pressed={locale === option.locale}
          disabled={pending && locale !== option.locale}
          onClick={() => setLocale(option.locale)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
