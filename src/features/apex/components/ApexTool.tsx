import { useLanguage } from '../../../i18n/LanguageProvider'
import { ApexWorkbench } from './ApexWorkbench'

export function ApexTool() {
  const { t } = useLanguage()
  const { apex } = t

  return (
    <section
      className="section-shell apex-section page-grid"
      id="apex-tool"
      aria-labelledby="apex-title"
    >
      <div className="section-heading">
        <p className="section-index">03</p>
        <h2 id="apex-title">{apex.title}</h2>
        {apex.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <ApexWorkbench />
      <p className="apex-disclaimer">{apex.disclaimer}</p>
    </section>
  )
}
