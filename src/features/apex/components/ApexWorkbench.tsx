import { useEffect, useMemo, useState } from 'react'

import { CopyButton } from '../../../components/common/CopyButton'
import { convertText } from '../../../i18n/convert'
import { useLanguage } from '../../../i18n/LanguageProvider'
import {
  accountKindLabels,
  accountOpeningMaterials,
} from '../fixtures/accountOpeningMaterials'
import { buildAccountOpeningResult } from '../utils/buildAccountOpeningResult'
import { formatAccountOpeningChecklist } from '../utils/formatAccountOpeningChecklist'
import type { AccountKind } from '../types/accountOpening'

const accountKinds: AccountKind[] = ['basic', 'general', 'special']

function toggleSelectedId(selectedIds: readonly string[], materialId: string) {
  if (selectedIds.includes(materialId)) {
    return selectedIds.filter((selectedId) => selectedId !== materialId)
  }

  return [...selectedIds, materialId]
}

export function ApexWorkbench() {
  const { locale } = useLanguage()
  const [accountKind, setAccountKind] = useState<AccountKind>('basic')
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([])
  const result = useMemo(
    () => buildAccountOpeningResult(accountKind, selectedIds),
    [accountKind, selectedIds],
  )
  const sourceText = useMemo(
    () => formatAccountOpeningChecklist(accountKindLabels[accountKind], result),
    [accountKind, result],
  )
  const [convertedText, setConvertedText] = useState(sourceText)
  const displayText = locale === 'zh-CN' ? sourceText : convertedText

  useEffect(() => {
    if (locale === 'zh-CN') {
      return undefined
    }

    let active = true

    convertText(sourceText, locale).then((nextText) => {
      if (active) {
        setConvertedText(nextText)
      }
    })

    return () => {
      active = false
    }
  }, [locale, sourceText])

  return (
    <div className="apex-workbench" aria-label="APEX 材料工作台">
      <section className="apex-panel" aria-labelledby="apex-input-title">
        <p className="section-index">01</p>
        <h3 id="apex-input-title">零散信息</h3>

        <fieldset className="apex-fieldset">
          <legend>开户类型</legend>
          {accountKinds.map((kind) => (
            <label key={kind}>
              <input
                type="radio"
                name="account-kind"
                checked={accountKind === kind}
                onChange={() => setAccountKind(kind)}
              />
              <span>{accountKindLabels[kind]}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="apex-fieldset">
          <legend>临时材料</legend>
          {accountOpeningMaterials.map((material) => (
            <label key={material.id}>
              <input
                type="checkbox"
                checked={selectedIds.includes(material.id)}
                onChange={() =>
                  setSelectedIds((currentIds) => toggleSelectedId(currentIds, material.id))
                }
              />
              <span>{material.name}</span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="apex-panel apex-panel--process" aria-labelledby="apex-process-title">
        <p className="section-index">02</p>
        <h3 id="apex-process-title">APEX 处理</h3>
        <p className="apex-trace">识别任务 → 调用专业能力 → 形成可复核结果</p>
      </section>

      <section className="apex-panel apex-panel--result" aria-label="清晰结果">
        <p className="section-index">03</p>
        <h3>清晰结果</h3>
        <pre className="apex-result">{displayText}</pre>
        <CopyButton text={sourceText} />
      </section>
    </div>
  )
}
