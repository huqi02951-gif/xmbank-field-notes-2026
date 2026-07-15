import { useId, useState } from 'react'

import { convertText } from '../../i18n/convert'
import { useLanguage } from '../../i18n/LanguageProvider'
import type { Locale } from '../../i18n/types'
import { Toast } from './Toast'

interface CopyButtonProps {
  text: string
  copyText?: typeof copyInLocale
  mode?: 'compact' | 'direct'
}

export async function copyInLocale(text: string, locale: Locale): Promise<void> {
  const convertedText = await convertText(text, locale)
  await globalThis.navigator.clipboard.writeText(convertedText)
}

export function CopyButton({ text, copyText = copyInLocale, mode = 'compact' }: CopyButtonProps) {
  const { locale } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const disclosureId = useId()

  async function handleCopy(targetLocale: Locale, successMessage: string) {
    try {
      await copyText(text, targetLocale)
      setMessage(successMessage)
    } catch {
      setMessage('复制失败，请手动选择文本')
    }
  }

  return (
    <div className="copy-actions">
      {mode === 'compact' ? <>
        <button
          type="button"
          className="copy-actions__primary"
          onClick={() => handleCopy(locale, '已复制当前版本')}
        >
          复制当前版本
        </button>
        <button
          type="button"
          className="copy-actions__disclosure"
          aria-expanded={expanded}
          aria-controls={disclosureId}
          onClick={() => setExpanded((current) => !current)}
        >
          选择复制语言
        </button>
      </> : null}
      {mode === 'direct' || expanded ? (
        <div
          className="copy-actions__explicit"
          id={mode === 'compact' ? disclosureId : undefined}
          role="group"
          aria-label="复制指定语言"
        >
          <button type="button" onClick={() => handleCopy('zh-CN', '已复制简体')}>
            复制简体
          </button>
          <button type="button" onClick={() => handleCopy('zh-TW', '已复制繁体')}>
            复制繁體
          </button>
        </div>
      ) : null}
      {message ? <Toast message={message} onDismiss={() => setMessage(null)} /> : null}
    </div>
  )
}
